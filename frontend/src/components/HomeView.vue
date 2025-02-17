<template>
  <div>
    <!-- Hero Section -->
    <section class="relative bg-cover bg-center h-[70vh] flex items-center justify-center text-center text-white"
      style="background-image: url('https://picsum.photos/1920/1080?random=7');">
      <div class="bg-black bg-opacity-50 p-8 rounded-xl">
        <h1 class="text-4xl md:text-6xl font-bold mb-4">Willkommen bei der Landjugend</h1>
        <p class="text-lg md:text-2xl mb-6">Gemeinschaft, Tradition und Spaß – Sei dabei!</p>
        <router-link to="/about" class="bg-primary hover:bg-secondary text-white px-6 py-3 rounded-full shadow-lg transition">Über
          uns</router-link>
      </div>
    </section>

    <!-- Vorstellung -->
    <section class="p-6 md:p-12 text-center">
      <h2 class="text-3xl md:text-4xl font-bold mb-4 text-primary">Über uns</h2>
      <p class="text-gray-700 text-lg max-w-3xl mx-auto">
        Wir sind die Landjugend [Ortsname], ein aktiver Verein für junge Menschen, die Spaß an Gemeinschaft, Tradition
        und gemeinsamen Projekten haben.
        Ob Feste, Ausflüge oder gemeinsames Arbeiten – bei uns ist immer was los!
      </p>
    </section>

    <!-- Neuigkeiten/Events -->
    <section class="bg-gray-100 py-8">
      <h2 class="text-3xl md:text-4xl font-bold text-center text-primary mb-6">Neuigkeiten & Events</h2>
      <div class="flex justify-center">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl">
        <div 
          v-for="event in upcomingEvents" 
          :key="event.id" 
          class="bg-white shadow-lg rounded-xl overflow-hidden max-w-[350px] mx-auto"
          :class="{ 'flex flex-col': !event.image }"
        >
          <!-- Falls ein Bild existiert, wird es angezeigt -->
          <img 
            v-if="event.image" 
            :src="'data:image/jpeg;base64,' + event.image" 
            :alt="event.title" 
            class="w-full h-48 object-cover"
          />

          <!-- Event-Textblock -->
          <div 
            class="p-4"
            :class="{ 'text-center': !event.image }"
          >
            <h3 class="text-xl font-semibold text-gray-800">{{ event.title }}</h3>
            <p class="text-gray-600 font-medium">{{ event.date }}</p>
            <p class="mt-2 text-gray-700 leading-relaxed">{{ event.description }}</p>
          </div>
        </div>
      </div>
    </div>
    </section>

    <!-- Mini-Galerie mit PrimeVue Galleria -->
    <section class="p-6 md:p-12">
      <h2 class="text-3xl md:text-4xl font-bold text-center text-primary mb-6">Einblicke in unsere Aktivitäten</h2>
      <Galleria :value="latestEvents" :numVisible="1" :circular="true" :autoPlay="true" :transitionInterval="4000"
        :showThumbnailNavigators="false" containerStyle="max-width: 900px; margin: auto;">
        <template #item="slotProps">
          <div class="flex justify-center items-center">
            <img :src="slotProps.item.path" :alt="slotProps.item.name"
              class="w-full max-h-[70vh] object-cover rounded-2xl shadow-lg" />
          </div>
        </template>
      </Galleria>
    </section>

    <!-- Call to Action -->
    <section class="bg-primary text-white text-center py-8">
      <h2 class="text-3xl md:text-4xl font-bold mb-4">Werde Teil unserer Gemeinschaft!</h2>
      <p class="text-lg mb-6">Schließe dich uns an und erlebe unvergessliche Momente mit der Landjugend.</p>
      <button class="bg-white text-primary hover:bg-gray-200 px-6 py-3 rounded-full shadow-lg transition">
        Jetzt Mitglied werden
      </button>
    </section>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import Galleria from 'primevue/galleria'
import { useEventStore } from '../stores/eventStore'

const eventStore = useEventStore();
const latestEvents = computed(() => eventStore.latestEvents);
const upcomingEvents = computed(() => eventStore.upcomingEvents);

// Beispiel-Events
</script>

<style scoped>
.bg-primary {
  @apply bg-green-600;
}

.bg-primary-dark {
  @apply bg-green-700;
}

.p-galleria {
  border: unset !important;
}
</style>
