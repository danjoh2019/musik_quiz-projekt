<template>
    <div class="header">
        <div class="border"></div>
        <div class="header-img">
            <img src="../assets/img/dancing.jpg" alt="illustration of people dancing" />
            <div class="box"></div>
        </div>
    </div>
</template>

<style scoped>
.border {
    background-color: #5775CD;
    padding: 1.5rem;
    opacity: 70%;
}

.header-img img {
    width: 100%;
    transform: scale(2.5);
    position: fixed;
    z-index: -1;
    left: -18rem;
    top: 10rem; 
}
@media screen and (min-width: 576px) {
    .border {
        display: none;
    }
    .header-img img {
        width: 100%;
        top: 15rem;
        left: -27rem;
    }
}
@media screen and (min-width: 768px) {
    .header-img img {
        width: 90%;
        top: 15rem;
    }

    .border {
        display: none;
    }
}

@media screen and (min-width: 992px) {
    .header-img img {
        margin-bottom: -4.5rem;
    }
}
</style>