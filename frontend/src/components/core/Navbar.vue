<script setup>
import { ref } from 'vue'

const isOpen = ref(false)
const toggleMenu = () => {
    isOpen.value = !isOpen.value
}
</script>
<template>
    <nav class="bg-primary text-white p-4 shadow-md relative z-50">
        <!-- z-50 sorgt dafür, dass die Navbar oben bleibt -->
        <div class="container mx-auto flex justify-between items-center">
            <h1 class="text-2xl font-bold">Landjugend</h1>

            <!-- Hamburger Icon für Mobile -->
            <button @click="toggleMenu" class="md:hidden focus:outline-none">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24"
                    stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
            </button>

            <!-- Navigation Links -->
            <ul :class="[
                'md:flex space-x-4 md:space-x-4',
                isOpen ? 'block' : 'hidden',
                'absolute md:static bg-primary md:bg-transparent w-full md:w-auto left-0 top-16 md:top-auto p-4 md:p-0 shadow-lg md:shadow-none',
                'z-40'
            ]">
                <li class="py-2 md:py-0"><router-link to="/"
                        class="hover:text-secondary block md:inline">Home</router-link></li>
                <li class="py-2 md:py-0"><router-link to="/events"
                        class="hover:text-secondary block md:inline">Events</router-link></li>
                <li class="py-2 md:py-0"><router-link to="/latest"
                        class="hover:text-secondary block md:inline">Galerie</router-link></li>
                <li class="py-2 md:py-0"><router-link to="/contact"
                        class="hover:text-secondary block md:inline">Kontakt</router-link></li>
                <li class="py-2 md:py-0"><router-link to="/about" class="hover:text-secondary block md:inline">Über
                        uns</router-link></li>
            </ul>
        </div>
    </nav>
</template>
<style scoped>
/* Optional: sanfte Übergänge */
ul {
    transition: all 0.3s ease-in-out;
}
</style>