<template>
    <div class="header">
        <div class="border"></div>
        <div class="header-img">
            <img src="../assets/img/dancing.jpg" alt="illustration of people dancing" />
        </div>
    </div>
</template>

<style scoped>
.border{
    background-color:  #5775CD;
    padding: 1rem;
    opacity: 70%;
}
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
    .border{
        display: none;
    }
}
@media screen and (min-width: 576px){
    .border{
        display: none;
    }
    .header-img img {
        width: 100%;
        top: 0rem;
        
    }
}

@media screen and (min-width: 992px) {
    .header-img img {
        top: -4rem;
        margin-bottom: -4.5rem;
        
    }
   
}
</style>