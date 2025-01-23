<template>
  <Header></Header>
  <main style="min-height: 831px;">
    <RouterView/>
  </main>
  <Footer></Footer>
</template>

<script>
import Header from './components/core/Header.vue'
import Footer from './components/core/Footer.vue'
import { RouterView } from 'vue-router';

export default {
  name: 'App',
  components: {
    Header,
    Footer,
    RouterView
  }
}
</script>

<style>

</style>