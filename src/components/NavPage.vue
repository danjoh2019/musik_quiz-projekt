<script setup>
import { RouterLink } from 'vue-router' 
</script>

<template>
  <div>
    <div class="nav">
      <RouterLink to="/">Home</RouterLink> <br>
      <RouterLink to="/category"> Categories</RouterLink> <br>
      <RouterLink to="/About"> About </RouterLink>
    </div>
  </div>
</template>

<style scoped>
body {
  color: white;
  
}
.nav {
  display: flex;
  list-style-type: none;
  margin: .5rem;
  padding: 1rem;
  justify-content: space-between;
}
</style>