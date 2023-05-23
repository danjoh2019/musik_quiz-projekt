<script setup>
import { RouterView } from 'vue-router'
import NavPage from './components/NavPage.vue'
</script>

<template>
  <main>
    <div class="wrapper">
      <div class="header">
        <NavPage />
      </div>
      <div class="main">
        <RouterView />
      </div>
   
    </div>
  </main>
</template>

<style scoped>
.header {
  position: fixed;
  bottom: 0;
  top: auto;
  width: 100%;
  z-index: 3;
}

@media screen and (min-width: 560px) {

  .header {
    display: contents;
    position: fixed;
  }
}
@media screen and (min-width: 768px) {
}

@media screen and (min-width: 992px) {


}
</style>