<template>
    <div class="header">
        <div class="header-img">
            <img src="../assets/img/dancing.jpg" alt="illustration of people dancing" />
        </div>
    </div>
</template>

<style scoped>
.header-img img {
    display: none;
}
@media screen and (min-width: 768px) {
    .header-img img {
        display: block;
        z-index: -2;
        width: 90%;
        position: relative;
        top: -3rem;
    }
}

@media screen and (min-width: 992px) {
    .header-img img {
        width: 100%;
        top: -6rem;
        
    }
   
}
</style>