<template>
    <div class="header">
        <div class="border"></div>
        <div class="header-img">
            <img src="../assets/img/dancing.jpg" alt="illustration of people dancing" />
        </div>
    </div>
</template>

<style scoped>
  /**
  * Component with an image which gives it the same size and position on the pages that it's used
  */
.border {
  
    background-color: #5775CD;
    padding: 1.5rem;
}

.header-img img {
    width: 150rem;
    position: fixed;
    z-index: -1;
    left: -80rem;
    top: 2rem;
    overflow: hidden;
}

@media screen and (min-width: 576px) {
    .border {
        display: none;
    }
}

@media screen and (min-width: 992px) {
    .header-img img {
        /*width: 85%;*/
        width: 110rem;
        left: -10rem;
        top: 3.5rem;
        
    }

}
</style>

<script setup>
</script>