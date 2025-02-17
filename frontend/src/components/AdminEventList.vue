<script setup>
import { ref } from "vue";
import VueEasyLightbox from "vue-easy-lightbox";
import { Dialog } from "primevue";
import { useEventStore } from "../stores/eventStore";

const events = ref([]);
const lightboxVisible = ref(false);
const lightboxImage = ref("");
const eventModalVisible = ref(false);
const deleteConfirmVisible = ref(false);
const isEditing = ref(false);
const eventData = ref({ id: null, title: "", description: "", date: "", image: "" });
const selectedEvent = ref(null);

const eventStore = useEventStore();

const fetchEvents = async () => {
    events.value = await eventStore.getEvents();
};

// Lightbox öffnen
const openLightbox = (image) => {
    lightboxImage.value = "data:image/jpeg;base64," + image;
    lightboxVisible.value = true;
};

// Modal für ein neues Event öffnen
const openAddModal = () => {
    eventData.value = { title: null, description: null, date: null, image: null, time: null };
    isEditing.value = false;
    eventModalVisible.value = true;
};

// Modal für Bearbeiten öffnen
const openEditModal = (event) => {
    eventData.value = { ...event }; // Event kopieren
    isEditing.value = true;
    eventModalVisible.value = true;
    imageBase64.value = null;
};
const imageBase64 = ref("");

const handleFileUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
        imageBase64.value = reader.result.split(",")[1];
    };
};

// Löschen bestätigen
const confirmDelete = (event) => {
    selectedEvent.value = event;
    deleteConfirmVisible.value = true;
};

// Event löschen
const deleteEvent = async () => {
    useEventStore().deleteEvent(selectedEvent.value.id);
    events.value = events.value.filter(e => e.id !== selectedEvent.value.id);
    deleteConfirmVisible.value = false;
};

function saveEvent() {
    if (imageBase64.value) {
        eventData.value.image = imageBase64.value;
    }
    console.log(eventData.value);
    if (isEditing.value) {
        eventStore.editEvent(eventData.value);
    } else {
        eventStore.addEvent(eventData.value);
    }
    eventModalVisible.value = false;
    fetchEvents();
}

// Events abrufen, wenn die Seite lädt
fetchEvents();
</script>

<template>
    <div class="p-4">
        <!-- Button zum Hinzufügen -->
        <button @click="openAddModal"
            class="bg-green-500 text-white px-4 py-2 rounded-lg shadow hover:bg-green-600 mb-4">
            + Neues Event
        </button>

        <!-- Event-Tabelle -->
        <table class="w-full border border-gray-300 shadow-lg rounded-lg overflow-hidden">
            <thead>
                <tr class="bg-primary text-white">
                    <th class="p-3 text-left">Titel</th>
                    <th class="p-3 text-left hidden md:table-cell">Beschreibung</th>
                    <th class="p-3 text-left">Datum</th>
                    <th class="p-3 text-center">Bild</th>
                    <th class="p-3 text-center">Aktionen</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="event in events" :key="event.id" class="border-b hover:bg-gray-100">
                    <td class="p-3">{{ event.title }}</td>
                    <td class="p-3 hidden md:table-cell truncate max-w-xs">{{ event.description }}</td>
                    <td class="p-3">{{ event.date }}</td>
                    <td class="p-3 text-center">
                        <img v-if="event.image" :src="'data:image/jpeg;base64,' + event.image" alt="Event Bild"
                            class="w-16 h-16 object-cover rounded shadow cursor-pointer transition transform hover:scale-110"
                            @click="openLightbox(event.image)" />
                    </td>
                    <td class="p-3 text-center">
                        <button @click="openEditModal(event)"
                            class="bg-blue-500 text-white px-4 py-1 rounded-lg shadow hover:bg-blue-600 mr-4">
                            Bearbeiten
                        </button>
                        <button @click="confirmDelete(event)"
                            class="bg-secondary text-white px-4 py-1 rounded-lg shadow hover:bg-red-600">
                            Löschen
                        </button>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>

    <!-- VueEasyLightbox für Bilder -->
    <vue-easy-lightbox :visible="lightboxVisible" :imgs="lightboxImage" @hide="lightboxVisible = false" />

    <!-- Event-Modal für Bearbeiten & Hinzufügen -->
    <Dialog v-model:visible="eventModalVisible" modal
        :header="isEditing ? 'Event bearbeiten' : 'Neues Event hinzufügen'"
        :style="{ background: '#f8f9fa', borderRadius: '12px', boxShadow: '0px 4px 10px rgba(0,0,0,0.2)' }">
        <form @submit.prevent="saveEvent" class="p-4 border-gray-300 shadow-lg rounded-lg">
            <label class="block font-semibold mb-1">Titel</label>
            <input v-model="eventData.title" type="text" class="w-full border rounded p-2 mb-3" required />

            <label class="block font-semibold mb-1">Beschreibung</label>
            <textarea v-model="eventData.description" class="w-full border rounded p-2 mb-3" required></textarea>

            <label class="block font-semibold mb-1">Datum</label>
            <input v-model="eventData.date" type="date" class="w-full border rounded p-2 mb-3" required />

            <label class="block font-semibold mb-1">Zeit</label>
            <input v-model="eventData.time" type="time" class="w-full border rounded p-2 mb-3" />

            <label class="block font-semibold mb-1">Bild</label>
            <input type="file" @change="handleFileUpload" class="w-full border rounded p-2 mb-3" />

            <div class="flex justify-end mt-4">
                <button type="submit" class="bg-green-500 text-white px-4 py-1 rounded-lg shadow hover:bg-green-600">
                    {{ isEditing ? "Speichern" : "Hinzufügen" }}
                </button>
            </div>
        </form>

    </Dialog>

    <Dialog v-model:visible="deleteConfirmVisible" modal header="Löschen bestätigen"
        :style="{ background: '#f8f9fa', borderRadius: '12px', boxShadow: '0px 4px 10px rgba(0,0,0,0.2)' }">
        <p>Möchtest du das Event <strong>{{ selectedEvent?.title }}</strong> wirklich löschen?</p>
        <div class="flex justify-end gap-2 mt-4">
            <button class="p-button-secondary" @click="deleteConfirmVisible = false">Abbrechen</button>
            <button class="p-button-danger" @click="deleteEvent">Ja, löschen</button>
        </div>
    </Dialog>
</template>

<style lang="css" scoped>
.p-dialog {
    background: #f8f9fa !important;
    /* Leichtes Grau statt Weiß */
    border-radius: 12px !important;
    /* Abgerundete Ecken */
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2) !important;
    /* Weicher Schatten */
    padding: 20px;
}
</style>