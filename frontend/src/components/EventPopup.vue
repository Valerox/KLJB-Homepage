<template>
    <div>
        <Dialog v-model:visible="visible" modal class="w-full max-w-lg">
            <div class="bg-white p-5 rounded-lg shadow-xl">
                <h2 class="text-primary text-2xl font-bold mb-4">Events am {{ selectedDate }}</h2>

                <div v-for="event in events" :key="event.id" class="border-b pb-4 mb-4 last:border-none">
                    <h3 class="text-lg font-semibold text-secondary">{{ event.title }}</h3>
                    <p class="text-gray-600">{{ event.description }}</p>
                    <p class="text-sm text-gray-500"><strong>Datum:</strong> {{ event.date }}</p>
                    <p v-if="event.time" class="text-sm text-gray-500"><strong>Uhrzeit:</strong> {{ event.time }}</p>

                    <div v-if="event.image" class="mt-3">
                        <img :src="'data:image/jpeg;base64,' + event.image" alt="Event Bild"
                            class="w-full h-40 object-cover rounded-lg shadow-md cursor-pointer"
                            @click="openLightbox(event.image)" />
                    </div>
                </div>

                <button @click="visible = false"
                    class="w-full mt-3 bg-secondary text-white py-2 rounded-lg hover:bg-opacity-80 transition">
                    Schließen
                </button>
            </div>
        </Dialog>

        <vue-easy-lightbox :visible="lightboxVisible" :imgs="lightboxImage" @hide="lightboxVisible = false" />
    </div>
</template>

<script setup>
import { ref } from "vue";
import Dialog from "primevue/dialog";
import VueEasyLightbox from "vue-easy-lightbox";

const visible = ref(false);
const selectedDate = ref("");
const events = ref([]);
const lightboxVisible = ref(false);
const lightboxImage = ref("");

const showEvents = (date, eventList) => {
    selectedDate.value = date;
    events.value = eventList;
    visible.value = true;
};
const openLightbox = (image) => {
    lightboxImage.value = "data:image/jpeg;base64," + image;
    lightboxVisible.value = true;
};

defineExpose({ showEvents });
</script>

<style scoped>
/* Hier kannst du optional weitere Tailwind Utility Klassen ergänzen */
</style>