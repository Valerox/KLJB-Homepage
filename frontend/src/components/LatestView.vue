<script setup>
import { ref, onMounted, computed } from 'vue'
import Headline from './Headline.vue'
import VueEasyLightbox from 'vue-easy-lightbox'
import { useEventStore } from '../stores/eventStore'

const eventStore = useEventStore();
const latestEvents = computed(() => eventStore.latestEvents)

// Für Lightbox
const imageUrls = latestEvents.value.map(img => img.path)
const lightboxVisible = ref(false)
const lightboxIndex = ref(0)

// Lightbox öffnen
const openLightbox = (index) => {
    lightboxIndex.value = index
    lightboxVisible.value = true
}
</script>


<template>
    <div class="p-4">
        <h2 class="text-3xl md:text-4xl font-bold text-center text-primary mb-6">Unsere Galerie</h2>

        <!-- Responsive Grid mit Lazy Loading und Lightbox -->
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      <div 
        v-for="(event, index) in latestEvents" 
        :key="index" 
        class="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow cursor-pointer"
        @click="openLightbox(index)"
      >
        <img 
          :src="event.path" 
          :alt="event.name" 
          class="w-full h-48 object-cover"
        />
        <div class="p-4">
          <h3 class="text-lg font-semibold text-gray-800">{{ event.name }}</h3>
          <p class="text-sm text-gray-600">{{ event.name }}</p>
        </div>
      </div>
    </div>

        <vue-easy-lightbox :visible="lightboxVisible" :imgs="imageUrls" :index="lightboxIndex"
            @hide="lightboxVisible = false" />
    </div>
</template>


<style scoped>
/* Sanfte Hover-Effekte für mehr Tiefe */
img {
    transition: transform 0.3s ease-in-out;
}

img:hover {
    transform: scale(1.03);
}
</style>;