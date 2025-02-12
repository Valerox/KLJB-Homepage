<template>
  <Navbar/>
  <main style="min-height: 831px;">
    <RouterView/>
  </main>
  <Footer></Footer>
</template>

<script setup>
import Navbar from './components/core/Navbar.vue'
import Footer from './components/core/Footer.vue'
import { RouterView } from 'vue-router';
</script>

<style>

</style>