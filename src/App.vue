<script setup>
import { RouterView } from 'vue-router'
import NavPage from './components/NavPage.vue'
import FooterPage from './components/FooterPage.vue'
</script>

<template>
  <main>
    <div class="wrapper">
      <div class="header">
        <div class="nav-header">
          <NavPage />
        </div>
        <RouterView />

      </div>

      <div class="main"></div>
      <div class="footer">
        <FooterPage />
      </div>

    </div>
  </main>
</template>
<style scoped>
.nav-header {
  display: none;
}


@media screen and (min-width: 768px) {
  .footer {
    display: none;
  }

  .nav-header {
    display: contents;
  }
}
</style>