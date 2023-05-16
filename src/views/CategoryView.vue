
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

.header-category {
    overflow: hidden;
}

.container-category {

    font-family: 'Montserrat', Impact, Haettenschweiler, 'Arial Narrow Bold', sans-serif;
    text-transform: uppercase;
    text-align: center;
}

button {
    display: flex;
    justify-content: center;
    align-items: center;

}

.container-category-buttons {
    display: grid;
    grid-template-columns: 50% 50%;
    align-items: center;
    margin-top: 15rem;
    background: linear-gradient(180deg, #fcf9f901 0%, #e8f4fae3 20%, #fffffff0 100%);
    width: 100%;
    padding: 2rem;
    border-radius: 2rem;
}

.category-button {

    padding: 3rem;
    border-radius: 1rem;
    margin: 1rem;
    border: none;
    font-family: 'Montserrat', Impact, Haettenschweiler, 'Arial Narrow Bold', sans-serif;
    font-size: 1rem;
    font-weight: bold;
    letter-spacing: 0.1rem;
    box-shadow: 2px 2px 8px rgba(57, 56, 56, 0.5);
    text-transform: uppercase;
    color: white;
}

/* -------- BUTTONS ----------*/

button[value="elektroniskt"],
button[value="pop"],
button[value="hiphop"] {
    background: linear-gradient(180deg, #f8c8c8f6 0%, #FFADAD 100%);
    box-shadow: 2px 2px 8px rgba(57, 56, 56, 0.5);

}


button[value="dansband"],
button[value="60/70-tal"],
button[value="country"] {

    background: linear-gradient(180deg, #4e6fd3ed 0%, #2431A4 100%);
    box-shadow: 2px 2px 8px rgba(57, 56, 56, 0.5);

}


button[value="folkmusik"],
button[value="soul/r&b"] {
    background: linear-gradient(180deg, #eb4242f3 0%, #CC0327 100%);
    box-shadow: 2px 2px 8px rgba(57, 56, 56, 0.5);


}

button[value="jazz"],
button[value="klassiskt"] {
    background: linear-gradient(180deg, #fea618ec 0%, #FF9921 100%);
    box-shadow: 2px 2px 8px rgba(57, 56, 56, 0.5);


}

/* -------- BUTTONS END----------*/

.header-img img {
    width: 390%;
    position: fixed;
    z-index: -2;
    left: -80rem;
    top: 4rem;

}

/* ---------------- FOR SMALL SCREEN --------------*/

@media screen and (min-width: 576px) {
    .container-category-buttons {
        display: grid;
        grid-template-columns: 33% 33% 33%;
        justify-items: stretch;

    }

    .category-button {

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
        background: linear-gradient(180deg, #f8c8c87f 0%, rgba(255, 173, 173, 0.886) 100%);
        box-shadow: 2px 2px 8px rgba(57, 56, 56, 0.5);
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
        background: linear-gradient(180deg, #4e6fd38b 0%, rgba(36, 49, 164, 0.927) 100%);

    }

    button[value="dansband"],
    button[value="soul/r&b"] {
        background: linear-gradient(180deg, #EB4242 0%, #CC0327 100%);
        box-shadow: 2px 2px 8px rgba(57, 56, 56, 0.5);
    }

    button[value="dansband"]:hover,
    button[value="soul/r&b"]:hover {
        background: linear-gradient(180deg, #eb424256 0%, #cc0328de 100%);
    }

    button[value="elektroniskt"],
    button[value="klassiskt"] {
        background: linear-gradient(180deg, #FEA418 0%, #FF9921 100%);
        box-shadow: 2px 2px 8px rgba(57, 56, 56, 0.5);

    }

    button[value="elektroniskt"]:hover,
    button[value="klassiskt"]:hover {
        background: linear-gradient(180deg, #fea61875 0%, #FF9921 100%);
    }

    /* --------------- BUTTONS BIGGER SCREEN END -------------*/

    .header-img img {
        width: 300%;
        position: fixed;
        opacity: 110%;
        z-index: -2;
        left: -92rem;
        top: 2rem;

    }
}

/* ---------------- MEDIUM --------------*/

@media screen and (min-width: 768px) {
    .container-category {
        display: grid;
        grid-template-rows: 20% 70% 10%;
        align-items: center;
        text-transform: uppercase;
        text-align: center;


    }

    .header-img img {
        max-width: 130%;
        position: fixed;
        opacity: 100%;
        z-index: -2;
        left: -8rem;
        top: 5rem;

    }

    .container-category-buttons {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        justify-items: stretch;
        gap: 1rem;
        padding: 2rem;
        z-index: 2;

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

    .header-img img {
        top: 0rem;
        max-width: 100%;
        position: relative;
        opacity: 100%;
        z-index: -2;
        left: 0rem;
    }

    .category-button {
        font-size: 1.1rem;
        letter-spacing: .3rem;
        text-shadow: #060b39;

    }

    .container-category-buttons {
        margin-top: 1rem;
        background: linear-gradient(180deg, #fcf9f9dc 0%, #fcf9f9e3 20%, #ffffff9e 100%);
        grid-template-columns: 20% 20% 20% 20%;
        justify-content: center;

    }

    .container-category {
        grid-template-rows: 30% 70%;
    }

}
</style>