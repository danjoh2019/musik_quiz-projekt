<script setup>
import { RouterView } from 'vue-router'
import NavPage from './components/NavPage.vue'
</script>

<template>
  <main>
    <div class="wrapper">
      <div class="header">
        <NavPage />
        <RouterView />
      </div>
    </div>

  </main>
</template>