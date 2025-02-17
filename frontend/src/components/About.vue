<template>
    <section class="p-6 md:p-12 max-w-5xl mx-auto">
        <!-- Überschrift -->
        <h2 class="text-3xl md:text-4xl font-bold text-center text-primary mb-6">Über uns</h2>

        <!-- Beschreibung -->
        <p class="text-lg text-gray-700 text-center max-w-3xl mx-auto">
            Wir sind die Landjugend [Ort] – ein junger, dynamischer Verein, der sich für Gemeinschaft, Tradition und
            moderne Landwirtschaft einsetzt. Mit regelmäßigen Veranstaltungen und Projekten fördern wir das Miteinander
            und
            die Entwicklung junger Menschen in der Region.
        </p>

        <!-- Vorstandsteam -->
        <div class="mt-12">
            <h3 class="text-2xl font-semibold text-center text-secondary mb-8">Unser Vorstand</h3>

            <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div v-for="member in boardMembers" :key="member.id"
                    class="text-center p-4 bg-white shadow-lg rounded-xl">
                    <img :src="member.image" :alt="member.name"
                        class="w-32 h-32 mx-auto rounded-full object-cover border-4 border-primary" />
                    <h4 class="text-lg font-bold mt-4">{{ member.name }}</h4>
                    <p class="text-gray-600">{{ member.role }}</p>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup>
import { ref } from 'vue'

const boardMembers = ref([
    { id: 1, name: 'Max Mustermann', role: '1. Vorsitzender', image: '/images/max.jpg' },
    { id: 2, name: 'Lisa Beispiel', role: '2. Vorsitzende', image: '/images/lisa.jpg' },
    { id: 3, name: 'Tobias Muster', role: 'Kassierer', image: '/images/tobias.jpg' },
    { id: 4, name: 'Anna Test', role: 'Schriftführerin', image: '/images/anna.jpg' },
    { id: 5, name: 'Felix Demo', role: 'Beisitzer', image: '/images/felix.jpg' }
])
</script>

<style scoped>
/* Optional: Falls du den Bildern einen Hover-Effekt geben willst */
img:hover {
    transform: scale(1.05);
    transition: 0.3s ease-in-out;
}
</style>