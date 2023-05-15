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
.nav,
.nav:link  {
  display: flex;
  list-style-type: none;
  position:sticky;
  width: 100%;
  padding: 1rem;
  justify-content: space-evenly;
  background: rgba(235, 87, 87, 0.33);
  color: blue;
  font-family: "Montserrat";
  text-transform: uppercase;
  text-decoration: none;

}
a {
  text-decoration: none;
  color:  #303BA1;
  font-weight: bold;
}
a:hover{
  color: rgba(235, 66, 66, 0.9);
}
</style>