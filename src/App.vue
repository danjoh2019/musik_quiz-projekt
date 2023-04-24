<script setup>
/* import TopLists from './components/TopLists.vue';
import Quiz from './components/Quiz.vue'; */
/* import CategoryView from './views/CategoryView.vue'; */
import { RouterView } from 'vue-router'
import NavPage from './components/NavPage.vue'

</script>

<template>
  <main>
    <div class="wrapper">
      <div class="header">
        <NavPage/>
        <RouterView/>
<!--         HEADER
      </div>

      <div class="content">
       
        <Quiz></Quiz>
        <TopLists></TopLists>

      </div>
      <div class="footer">
        
              FOOTER -->
          </div>
    </div>

  </main>
</template>