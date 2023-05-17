
<template>
    <div class="container-category">
        <div class="header-category">
            <!--<h1>Quiz</h1>-->
            <div class="header-img">
                <img src="../assets/img/dancing.jpg" alt="illustration of people dancing" />
            </div>
        </div>
        <div class="container-category-buttons">
            <button v-for="category in categories" :key="category.id" :value="category.genre" :id="category.id"
                @click="selectCategory(category.id, category.genre)" class="category-button">
                <p>{{ category.genre }}</p>
            </button>
        </div>
    </div>
</template>
  
<script setup>
import { useRouter } from 'vue-router'
import categories from '../data/categories.json'
const router = useRouter()
function selectCategory(id, categoryString) {
    router.push({ name: 'quiz', params: { id: id }, query: { genre: categoryString } })
}
</script>
<style scoped>
/* ---------------- FOR SMALLEST SCREEN --------------*/
.container-category {
    text-transform: uppercase;
    text-align: center;
    
    display: grid;
    grid-template-rows: 8rem 1fr;

}

.header-img img {
    width: 100%;
    transform: scale(3.5);
    position: fixed;
    z-index: -1;
    right: 16rem;
    top: 15rem;
    
}

.container-category-buttons {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    justify-items: center;
    background: linear-gradient(180deg, #fcf9f914 0%, #f0f6f9ef 15%, #fffffff0 100%);

}

.category-button {
    width: 10rem;
    padding: 3rem;
    border-radius: 1.5rem;
    margin: .5rem;
    border: none;
    font-family: 'Adventuro', 'Montserrat', Impact, Haettenschweiler, 'Arial Narrow Bold', sans-serif;
    font-size: 1rem;
    font-weight: normal;
    letter-spacing: 0.14rem;
    box-shadow: 3px 3px 8px rgba(57, 56, 56, 0.5);
    text-transform: uppercase;
    color: rgb(248, 248, 250);
}

button {
    display: flex;
    justify-content: center;
    align-items: center;

}

/* -------- BUTTONS ----------*/

button[value="elektroniskt"],
button[value="pop"],
button[value="hiphop"] {
    background: linear-gradient(180deg, #f8c8c8 0%, #FFADAD 100%);
    box-shadow: 2px 2px 8px rgba(57, 56, 56, 0.5);

}


button[value="dansband"],
button[value="60/70-tal"],
button[value="country"] {

    background: linear-gradient(180deg, #4e6fd3 0%, #2431A4 100%);
    box-shadow: 2px 2px 8px rgba(57, 56, 56, 0.5);

}


button[value="folkmusik"],
button[value="soul/r&b"] {
    background: linear-gradient(180deg, #eb4242 0%, #CC0327 100%);
    box-shadow: 2px 2px 8px rgba(57, 56, 56, 0.5);


}

button[value="jazz"],
button[value="klassiskt"] {
    background: linear-gradient(180deg, #fea618 0%, #FF9921 100%);
    box-shadow: 2px 2px 8px rgba(57, 56, 56, 0.5);


}

/* -------- BUTTONS END----------*/



/* ---------------- FOR SMALL SCREEN --------------*/

@media screen and (min-width: 576px) {

    .header-img img {
       
        transform: scale(2);
        right: 20rem;
        top: 13rem;
    }

    .container-category-buttons {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        justify-items: center;
    }

    .category-button {
        width: 12rem;
        flex-grow: 1;
        padding: 4rem;
        border-radius: 1rem;
        margin: 1rem;
    }

    /* --------------- BUTTONS BIGGER SCREEN -------------*/

    button[value="jazz"],
    button[value="pop"],
    button[value="hiphop"] {
        background: linear-gradient(180deg, #F8C8C8 0%, #FFADAD 100%);
        box-shadow: 2px 2px 8px rgba(57, 56, 56, 0.5);
        

    }

    button[value="jazz"]:hover,
    button[value="pop"]:hover,
    button[value="hiphop"]:hover {
        background: linear-gradient(180deg, #f8c8c8 0%,  #ffacac 50%,rgb(250, 131, 131) 100%);
        box-shadow: 2px 2px 8px rgba(57, 56, 56, 0.5);
        border-inline:1px solid  #f8c8c8 ;
      

    }

    button[value="folkmusik"],
    button[value="60/70-tal"],
    button[value="country"] {

        background: linear-gradient(180deg, #4E70D3 0%, #2431A4 100%);
        box-shadow: 2px 2px 8px rgba(57, 56, 56, 0.5);

    }

    button[value="folkmusik"]:hover,
    button[value="60/70-tal"]:hover,
    button[value="country"]:hover {
        background: linear-gradient(180deg, #6187f8 0%, rgb(39, 53, 176) 100%);
        border-inline:1px solid #6187f8;

    }

    button[value="dansband"],
    button[value="soul/r&b"] {
        background: linear-gradient(180deg, #EB4242 0%, #CC0327 100%);
        box-shadow: 2px 2px 8px rgba(57, 56, 56, 0.5);
    }

    button[value="dansband"]:hover,
    button[value="soul/r&b"]:hover {
        background: linear-gradient(180deg, #f45151 0%, #a0011e 100%);
        border-inline:1px solid #f45151;
    }

    button[value="elektroniskt"],
    button[value="klassiskt"] {
        background: linear-gradient(180deg, #FEA418 0%, #ff9721df 100%);
        box-shadow: 2px 2px 8px rgba(57, 56, 56, 0.5);
        
    }

    button[value="elektroniskt"]:hover,
    button[value="klassiskt"]:hover {
        background: linear-gradient(180deg, #f8bc5a 0%, #f98705 100%);
        border-inline:1px solid#f8bc5a;
    }

    /* --------------- BUTTONS BIGGER SCREEN END -------------*/

}

/* ---------------- MEDIUM --------------*/

@media screen and (min-width: 768px) {
    .container-category {
        display: grid;
        grid-template-rows: 30% 70% 10%;
        align-items: center;
        text-transform: uppercase;
        text-align: center;
        overflow: hidden;


    }

    .header-img img {
        transform: scale(1.5);
        position: relative;
        right: 0rem;
        top: 5rem;


    }


    .category-button {
        flex-grow: 1;
        padding: 4rem;
        border-radius: 1rem;
        margin: 0.5rem;
    }



}

/* ---------------- LARGE --------------*/

@media screen and (min-width: 992px) {

    .container-category {
        grid-template-rows: 30% 70%;
    }

    .header-img img {
        transform: scale(.95);
        top: 2rem;
        max-width: 100%;

    }

    .container-category-buttons {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        justify-items: stretch;
        gap: 1rem;
        padding: 2rem;
        background: linear-gradient(180deg, #fcf9f9 0%, #fcf9f9e3 20%, #ffffff9e 100%);

    }

    .category-button {
        font-size: 1.1rem;
        letter-spacing: .3rem;
        text-shadow: #060b39;

    }


}
</style>