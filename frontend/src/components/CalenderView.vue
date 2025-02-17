<template>
    <section class="p-6 md:p-12">
        <h2 class="text-3xl md:text-4xl font-bold text-center text-primary mb-6">Event-Kalender</h2>

        <!-- Kalender -->
        <div class="bg-white shadow-lg rounded-xl p-6 max-w-5xl mx-auto border-2 border-primary">
            <FullCalendar ref="calendar" :options="calendarOptions" class="w-full" />
        </div>

        <EventPopup ref="eventPopup" />
    </section>
</template>

<script setup>
import { computed, ref, watch } from 'vue'
import FullCalendar from '@fullcalendar/vue3'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'
import Dialog from 'primevue/dialog'
import EventPopup from './EventPopup.vue'
import { useEventStore } from '../stores/eventStore'

const eventStore = useEventStore();
const events = computed(() => eventStore.events);

const calendar = ref(null);
const eventPopup = ref(null);

watch(events, (newEvents) => {
    if (calendar.value) {
        let calendarApi = calendar.value.getApi();
        calendarApi.removeAllEvents(); // Alte Events entfernen
        console.log(newEvents);
        calendarApi.addEventSource(newEvents); // Neue Events setzen
    }
});
const handleDateClick = (info) => {
    // Filtere alle Events für das angeklickte Datum
    const eventsOnDate = events.value.filter(event => event.date === info.dateStr);

    if (eventsOnDate.length > 0) {
        eventPopup.value.showEvents(info.dateStr, eventsOnDate);
    }
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