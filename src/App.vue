<script setup>
import { RouterView } from 'vue-router'
import NavPage from './components/NavPage.vue'
import FooterPage from './components/FooterPage.vue'
</script>

<template>
  <main>
    <div class="wrapper">
      <div class="header">
        <NavPage />
        <RouterView />
      </div>
      <div class="main"></div>
      <div class="footer">
        <FooterPage />
      </div>
    </div>

  </main>
</template>