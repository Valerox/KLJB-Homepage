import { defineStore } from "pinia";
import { computed, ref } from "vue";
import axios from "axios";
import { Event } from "../types/Event";

export const useEventStore = defineStore("event", () => {
  const api = axios.create({
    baseURL: "http://localhost:5000/",
  });

  const latestEvents = ref([
    {
      name: "72h Aktion",
      path: "/src/assets/72h_aktion.jpg",
      date: "18.04.2024",
    },
    {
      name: "Altkleidersammlung",
      path: "/src/assets/altkleidersammlung.jpg",
      date: "04.05.2024",
    },
    {
      name: "Big Bunny Party",
      path: "/src/assets/big_bunny_party.jpg",
      date: "20.04.2023",
    },
    {
      name: "Burschenball Pilling",
      path: "/src/assets/burschenball_pilling.jpg",
      date: "20.04.2023",
    },
    {
      name: "Dorffasching",
      path: "/src/assets/dorffasching.jpg",
      date: "20.04.2023",
    },
    {
      name: "Fahnenweih Illkofen",
      path: "/src/assets/fahnenweih_illkofen.jpg",
      date: "20.04.2023",
    },
    {
      name: "Gewölbeparty Sünching",
      path: "/src/assets/gewoelbeparty_suenching.jpg",
      date: "20.04.2023",
    },
    {
      name: "Lebendkicker",
      path: "/src/assets/lebendkicker.jpg",
      date: "20.04.2023",
    },
    {
      name: "Ostersonntagsmeiern",
      path: "/src/assets/ostersonntagsmeiern.jpg",
      date: "20.04.2023",
    },
    {
      name: "Silvesterparty",
      path: "/src/assets/silvesterparty.jpg",
      date: "20.04.2023",
    },
    {
      name: "Starkbierfest",
      path: "/src/assets/starkbierfest.jpg",
      date: "20.04.2024",
    },
    { name: "Skifahrt", path: "/src/assets/skifahrt.jpg", date: "20.04.2024" },
  ]);

  const upcomingEvents = computed(() => {
    const today = new Date().toISOString().split("T")[0];
    return events.value
      .filter((item) => item.date > today)
      .sort((a, b) => a.date.localeCompare(b.date))
      .slice(0, 3);
  });

  const events = ref<Event[]>([]);

  async function addEvent(event: Event) {
    console.log("addEvent", event);
    try {
      await api.post("/events", event);
      console.log("event erfolgreich gespeichert", event);
    } catch (error) {
      console.error("Fehler beim Speichern des Events:", error);
    }
  }

  async function editEvent(event: Event) {
    try {
      await api.put(`/events/${event.id}`, event);
    } catch (error) {
      console.error("Fehler beim Speichern:", error);
    }
  }

  async function deleteEvent(eventId: number) {
    try {
      await api.delete(`/events/${eventId}`);
    } catch (error) {
      console.error("Fehler beim Löschen:", error);
    }
  }

  async function getEvents() {
    try {
      const response = await api.get("/events");
      console.log("Events geladen:", response.data);
      return response.data;
    } catch (error) {
      console.error("Fehler beim Laden der Events:", error);
    }
  }

  function fetchEvents() {
    getEvents().then((data) => {
      events.value = data;
    });
  }
  fetchEvents();
  setInterval(fetchEvents, 30000);
  return {
    latestEvents,
    upcomingEvents,
    events,
    addEvent,
    editEvent,
    deleteEvent,
    getEvents,
  };
});
