<script setup>
import { RouterLink } from 'vue-router' 
</script>

<template>
  <div>
    <div class="nav">
      <div class="hamburger-icon">
        <div class="hamburger-top"></div>
        <div class="hamburger-middle"></div>
        <div class="hamburger-bottom"></div>
      </div>
      <RouterLink to="/">Home</RouterLink> <br>
      <RouterLink to="/category"> Categories</RouterLink> <br>
      <RouterLink to="/About"> About </RouterLink>
    </div>
  </div>
</template>

<style scoped>

.nav,
.nav:link {
  display: flex;
  list-style-type: none;
  width: 100%;
  padding: 1rem;
  justify-content: space-evenly;
  background: rgba(235, 87, 87, 0.33);
  font-family: "Montserrat", Impact, Haettenschweiler, 'Arial Narrow Bold', sans-serif;
  text-transform: uppercase;
  text-decoration: none;
}

.nav {
  position: sticky;
}

a {
  display:flex;
  text-decoration: none;
  color: #303BA1;
  font-size: .8rem;
  
}

a:hover {
  color: rgba(235, 66, 66, 0.9);
}
@media screen and (min-width: 560px) {
/*
  .hamburger-top,
  .hamburger-middle,
  .hamburger-bottom {
    width: 1.2rem;
    height: .2rem;
    margin-bottom: .2rem;
    border-radius: 1rem;
    background-color: white;
  }
  */
  .hamburger-bottom {
    margin-bottom: 0rem;

  }
  a{
    font-weight: bold;
  }


}
</style>