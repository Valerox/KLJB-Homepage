<script setup>
import { ref, onMounted } from 'vue'
import Headline from './Headline.vue'
const latestEvents = ref([
    {name: "72h Aktion", path: "/src/assets/72h_aktion.jpg", date: "18.04.2024 - 21.04 2024"},
    {name: "Altkleidersammlung", path: "/src/assets/altkleidersammlung.jpg", date: "04.05.2024"},
    {name: "Big Bunny Party", path: "/src/assets/big_bunny_party.jpg", date: "20.04.2023"},
    {name: "Burschenball Pilling", path: "/src/assets/burschenball_pilling.jpg", date: "20.04.2023"},
    {name: "Dorffasching", path: "/src/assets/dorffasching.jpg", date: "20.04.2023"},
    {name: "Fahnenweih Illkofen", path: "/src/assets/fahnenweih_illkofen.jpg", date: "20.04.2023"},
    {name: "Gewölbeparty Sünching", path: "/src/assets/gewoelbeparty_suenching.jpg", date: "20.04.2023"},
    {name: "Lebendkicker", path: "/src/assets/lebendkicker.jpg", date: "20.04.2023"},
    {name: "Ostersonntagsmeiern", path: "/src/assets/ostersonntagsmeiern.jpg", date: "20.04.2023"},
    {name: "Silvesterparty", path: "/src/assets/silvesterparty.jpg", date: "20.04.2023"},
    {name: "Starkbierfest", path: "/src/assets/starkbierfest.jpg", date: "20.04.2024"},
    {name: "Skifahrt", path: "/src/assets/skifahrt.jpg", date: "20.04.2024"}
])
</script>







<template>
    <Headline title="Aktuellles"></Headline>
    <div class="border grid grid-cols-2 gap-4 justify-between">
        <div v-for="event in latestEvents" class="border">
            <h2 class="text-center mb-4 text-3xl font-semibold leading-none tracking-tight text-gray-900 md:text-4xl ">{{ event.name }}</h2>
            <img :src="event.path" class="h-[550px] ml-auto mr-auto">
            <h3 class="text-center mb-4 leading-none font-semibold tracking-tight text-gray-900 md:text-3xl">{{ event.date }}</h3>
        </div>
    </div>
</template>