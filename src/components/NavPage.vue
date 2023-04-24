<script setup>
import { RouterLink } from 'vue-router' 
</script>

<template>
  <div>
    <div class="nav">
    <RouterLink to="/">Home</RouterLink> 
     <RouterLink to="/category"> Categories</RouterLink> 
    </div>
  </div>
</template>

<style scoped>
body {
  color: white;
  
}
.nav {
  padding: 2rem;
}
</style>