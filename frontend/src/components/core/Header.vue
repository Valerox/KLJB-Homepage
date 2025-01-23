<script setup>
import { RouterLink, useRouter } from 'vue-router'
import { ref } from 'vue'
import Menubar from 'primevue/menubar'

const router = useRouter()

const items = ref([
    {
        label: 'Startseite',
        command: () => {
            router.push('/');
        }
    },
    {
        label: 'Aktuelles',
        command: () => {
            router.push('/latest');
        }
    },
    {
        label: 'Kontakt',
        command: () => {
            router.push('/contact');
        }
    }
]);
</script>

<template>
  <Menubar :model="items" />
</template>