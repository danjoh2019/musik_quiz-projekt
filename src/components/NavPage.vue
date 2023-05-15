<script setup>
import { RouterLink } from 'vue-router' 
</script>

<template>
  <div>
    <div class="nav">
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
  margin: .5rem;
  padding: 1rem;
  justify-content: space-between;
} */

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