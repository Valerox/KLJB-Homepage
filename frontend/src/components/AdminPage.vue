<script setup>
import { ref } from "vue";

const password = ref("");
const isAuthenticated = ref(false);

const checkPassword = () => {
  if (password.value === "landjugendAdmin") { // 🔒 Einfaches Passwort
    isAuthenticated.value = true;
  } else {
    alert("Falsches Passwort!");
  }
};
</script>

<template>
  <div class="p-6">
    <h1 class="text-2xl font-bold">🔒 Admin-Bereich</h1>

    <div v-if="!isAuthenticated" class="mt-4">
      <input v-model="password" type="password" placeholder="Passwort eingeben" class="p-2 border rounded" />
      <button @click="checkPassword" class="bg-blue-500 text-white px-4 py-2 rounded ml-2">Login</button>
    </div>

    <div v-else>
      <h2 class="text-xl font-semibold mt-4">📅 Events verwalten</h2>
      <router-link to="/admin/events" class="block mt-2 text-blue-500">Events bearbeiten</router-link>
      <router-link to="/admin/add-event" class="block mt-2 text-blue-500">Neues Event hinzufügen</router-link>
    </div>
  </div>
</template>