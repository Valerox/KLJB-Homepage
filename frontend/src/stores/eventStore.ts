import { defineStore } from "pinia";
import { ref } from "vue";

export const useEventStore = defineStore("event", () => {
  const latestEvents = ref([
    {
      name: "72h Aktion",
      path: "/src/assets/72h_aktion.jpg",
      date: "18.04.2024 - 21.04 2024",
    },
    {
      name: "Altkleidersammlung",
      path: "/src/assets/altkleidersammlung.jpg",
      date: "04.05.2024",
    },
    {
      name: "Big Bunny Party",
      path: "/src/assets/big_bunny_party.jpg",
      date: "20.04.2023",
    },
    {
      name: "Burschenball Pilling",
      path: "/src/assets/burschenball_pilling.jpg",
      date: "20.04.2023",
    },
    {
      name: "Dorffasching",
      path: "/src/assets/dorffasching.jpg",
      date: "20.04.2023",
    },
    {
      name: "Fahnenweih Illkofen",
      path: "/src/assets/fahnenweih_illkofen.jpg",
      date: "20.04.2023",
    },
    {
      name: "Gewölbeparty Sünching",
      path: "/src/assets/gewoelbeparty_suenching.jpg",
      date: "20.04.2023",
    },
    {
      name: "Lebendkicker",
      path: "/src/assets/lebendkicker.jpg",
      date: "20.04.2023",
    },
    {
      name: "Ostersonntagsmeiern",
      path: "/src/assets/ostersonntagsmeiern.jpg",
      date: "20.04.2023",
    },
    {
      name: "Silvesterparty",
      path: "/src/assets/silvesterparty.jpg",
      date: "20.04.2023",
    },
    {
      name: "Starkbierfest",
      path: "/src/assets/starkbierfest.jpg",
      date: "20.04.2024",
    },
    { name: "Skifahrt", path: "/src/assets/skifahrt.jpg", date: "20.04.2024" },
  ]);

  const upcomingEvents = ref([
    { id: 1, title: 'Frühlingsfest', date: '15. März 2024', description: 'Ein tolles Fest mit Musik und Tanz!', image: 'https://picsum.photos/600/400?random=1' },
    { id: 2, title: 'Sommerparty', date: '20. Juni 2024', description: 'Grillen, Musik und Spaß am See!', image: '' },
    { id: 3, title: 'Weihnachtsmarkt', date: '10. Dezember 2024', description: 'Gemütliche Atmosphäre mit Glühwein.', image: 'https://picsum.photos/600/400?random=3' },
  ])

  return {
    latestEvents,
    upcomingEvents,
  };
});
