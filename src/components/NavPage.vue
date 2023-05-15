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
      <ul>
        <li><a class="activ" href="#news"><RouterLink to="/">Home</RouterLink></a></li>
        <li><a href="#category"><RouterLink to="/category"> Categories</RouterLink></a></li>
        <li style="float:right"><a href="#about"><RouterLink to="/About"> About </RouterLink></a></li>
      </ul>
    </div>
  </div>
</template>

<style scoped>
body {
  color: white;

}

/* .nav {
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




ul {
  list-style-type: none;
  margin: 0;
  padding: 0;
  overflow: hidden;
  background-color: #333;
}

li {
  float: left;
  border-right:1px solid #bbb;
}

li:last-child {
  border-right: none;
}

li a {
  display: block;
  color: white;
  text-align: center;
  padding: 14px 16px;
  text-decoration: none;
}

li a:hover:not(.active) {
  background-color: #111;
}
</style>