<template>
    <section class="p-6 md:p-12">
        <h2 class="text-3xl md:text-4xl font-bold text-center text-primary mb-6">Event-Kalender</h2>

        <!-- Kalender -->
        <div class="bg-white shadow-lg rounded-xl p-6 max-w-5xl mx-auto border-2 border-primary">
            <FullCalendar :options="calendarOptions" class="w-full" />
        </div>

        <!-- PrimeVue Dialog (Popup) -->
        <Dialog v-model:visible="showDialog" modal header="Events an diesem Tag" class="max-w-lg w-full">
            <div v-if="selectedEvents.length > 0">
                <ul class="mt-4 space-y-3">
                    <li v-for="event in selectedEvents" :key="event.id"
                        class="p-4 bg-primary text-white rounded-lg shadow">
                        <h4 class="text-lg font-bold">{{ event.title }}</h4>
                        <p class="text-sm">{{ event.date }}</p>
                    </li>
                </ul>
            </div>
            <div v-else class="text-gray-600 text-center p-4">
                Keine Events für diesen Tag.
            </div>
        </Dialog>
    </section>
</template>

<script setup>
import { ref } from 'vue'
import FullCalendar from '@fullcalendar/vue3'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'
import Dialog from 'primevue/dialog'

const events = ref([
    { id: 1, title: 'Frühlingsfest', date: '2025-02-15' },
    { id: 2, title: 'Sommerparty', date: '2024-06-20' },
    { id: 3, title: 'Weihnachtsmarkt', date: '2024-12-10' },
    { id: 4, title: 'Vereinsversammlung', date: '2024-03-15' }
])

const showDialog = ref(false)
const selectedDate = ref('')
const selectedEvents = ref([])

const handleDateClick = (info) => {
    selectedDate.value = info.dateStr
    selectedEvents.value = events.value.filter(event => event.date === info.dateStr)
    showDialog.value = true
}

const calendarOptions = ref({
    plugins: [dayGridPlugin, interactionPlugin],
    initialView: 'dayGridMonth',
    events: events.value,
    headerToolbar: {
        left: 'prev,next today',
        center: 'title',
        right: 'dayGridMonth,dayGridWeek,dayGridDay'
    },
    editable: false,
    selectable: true,
    dateClick: handleDateClick
})
</script>

<style scoped>
/* FullCalendar Custom Styling */
:deep(.fc-daygrid-day-number) {
    color: var(--color-primary);
    font-weight: bold;
}

:deep(.fc-toolbar-title) {
    color: var(--color-primary);
    font-size: 1.5rem;
    font-weight: bold;
}

:deep(.fc-button-primary) {
    background-color: var(--color-secondary) !important;
    border-color: var(--color-secondary) !important;
}

:deep(.fc-button-primary:hover) {
    background-color: var(--color-primary) !important;
    border-color: var(--color-primary) !important;
}
</style>