<script setup>
import TopLists from './components/TopLists.vue';
import Quiz from './components/Quiz.vue';
</script>

<template>
  <header>
  </header>

  <main>
    <div class="wrapper">
      <div class="header">
        HEADER
      </div>

      <div class="content">
        <Quiz></Quiz>
        <TopLists></TopLists>

      </div>
      <div class="footer">
              
              <category-button button-text="pop" id="163"></category-button>
              FOOTER
          </div>
    </div>

  </main>
</template>