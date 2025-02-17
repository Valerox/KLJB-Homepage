from flask import Flask, request, jsonify
import mysql.connector
import base64
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# MariaDB-Verbindungsdaten
DB_CONFIG = {
    "host": "192.168.178.66",  # Ändern auf deine Raspberry-Pi-IP
    "user": "root",
    "password": "root",
    "database": "kljb"
}

# Verbindung zur MariaDB
def get_db_connection():
    return mysql.connector.connect(**DB_CONFIG)

# 🗓️ Route: Alle Events abrufen
@app.route("/events", methods=["GET"])
def get_events():
    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)
    cursor.execute("SELECT id, title, description, date, TIME_FORMAT(time, '%H:%i:%s') AS time, location, image_data FROM events")
    events = cursor.fetchall()
    conn.close()
    event_list = []
    for event in events:
        event_list.append({
            "id": event["id"],
            "title": event["title"],
            "description": event["description"],
            "date": event["date"].strftime('%Y-%m-%d') if event["date"] else None,
            "time": event["time"],
            "location": event["location"],
            "image": base64.b64encode(event["image_data"]).decode("utf-8") if event["image_data"] else None
        })

    return jsonify(event_list)

# ➕ Route: Neues Event hinzufügen
@app.route("/events", methods=["POST"])
def add_event():
    data = request.json
    print(data)
    title = data["title"]
    description = data["description"]
    date = data["date"]
    time = data.get("time", None)
    location = data.get("location", None)
    image_data = data.get("image", None)  # Base64-Bilddaten
    
    conn = get_db_connection()
    cursor = conn.cursor()
    
    if image_data:  # Falls ein Bild mitgesendet wird
        image_binary = base64.b64decode(image_data)
        query = "INSERT INTO events (title, description, date, time, location, image_data) VALUES (%s, %s, %s, %s, %s, %s)"
        cursor.execute(query, (title, description, date, time, location, image_binary))
    else:
        query = "INSERT INTO events (title, description, date, time, location) VALUES (%s, %s, %s, %s, %s)"
        cursor.execute(query, (title, description, date, time, location))
    
    conn.commit()
    event_id = cursor.lastrowid
    conn.close()
    
    return jsonify({"message": "Event hinzugefügt", "id": event_id}), 201

# 🖼️ Route: Ein einzelnes Event mit Bild abrufen
@app.route("/events/<int:event_id>", methods=["GET"])
def get_event(event_id):

    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)
    cursor.execute("SELECT * FROM events WHERE id = %s", (event_id,))
    event = cursor.fetchone()
    conn.close()

    if event:
        if event["image_data"]:
            event["image_data"] = base64.b64encode(event["image_data"]).decode("utf-8")  # In Base64 zurückgeben
        return jsonify(event)
    
    return jsonify({"message": "Event nicht gefunden"}), 404

@app.route('/events/<int:event_id>', methods=['PUT'])
def update_event(event_id):
    try:
        data = request.json  # JSON-Daten aus dem Frontend
        title = data.get("title")
        description = data.get("description")
        date = data.get("date")
        time = data.get("time")
        image = data.get("image", None)  # Base64-Bild als String
        if image:
            image = base64.b64decode(image)

        if not title or not date:
            return jsonify({"error": "Titel und Datum sind erforderlich"}), 400

        conn = get_db_connection()
        cursor = conn.cursor()

        # SQL-Update-Statement
        cursor.execute("""
            UPDATE events 
            SET title = %s, description = %s, date = %s, time = %s, image_data = %s
            WHERE id = %s
        """, (title, description, date, time, image, event_id))

        conn.commit()
        cursor.close()
        conn.close()

        return jsonify({"message": "Event erfolgreich aktualisiert"}), 200
    except Exception as e:
        print(e)
        return jsonify({"error": str(e)}), 500

@app.route('/events/<int:event_id>', methods=['DELETE'])
def delete_event(event_id):
    try:
        conn = get_db_connection()
        cursor = conn.cursor()

        # Event aus der Datenbank löschen
        cursor.execute("DELETE FROM events WHERE id = %s", (event_id,))
        conn.commit()

        cursor.close()
        conn.close()

        return jsonify({"message": "Event erfolgreich gelöscht"}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500
if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)
    