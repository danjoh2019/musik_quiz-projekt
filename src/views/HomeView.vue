<script setup>
import TopLists from '../components/TopLists.vue';

</script>

<template>
  <main>
    <div class="wrapper">
      <div class="header"> 
        <div class="header-logo"><img src="../assets/img/logo-color.png" width="200" height="66" alt="musicquiz logo"></div>

      </div>

      <div class="content">

        <TopLists />

      </div>
      <div class="footer">

        2023
      </div>
    </div>

  </main>
</template>

<style>
#title {
  color: red;
  font-family: "Montserrat", Impact, Haettenschweiler, 'Arial Narrow Bold', sans-serif;
  text-align: center;
  font-size: 30px;
}
</style>