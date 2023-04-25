<script setup>
import { RouterLink } from 'vue-router' 
</script>

<template>
  <div>
    <div class="nav">
    <RouterLink to="/">Home</RouterLink> <br>
     <RouterLink to="/category"> Categories</RouterLink> 
    </div>
  </div>
</template>

<style scoped>
body {
  color: white;
  
}
.nav {
  list-style-type: none;
  display: block;
  margin: 2rem;
  padding: 1rem;
}
</style>