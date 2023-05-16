
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

.header-category{
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
    margin-top: 17rem;
    background-color: white;
    width: 100%;
    padding: 2rem;
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
    color: linear-gradient(180deg, #fcf9f9e3 0%, #d191919e 100%);
}

button[value="elektroniskt"],
button[value="pop"],
button[value="hiphop"] {
    background: linear-gradient(180deg, #f8c8c8e3 0%, #FFADAD 100%);
    box-shadow: 2px 2px 8px rgba(57, 56, 56, 0.5);

}

button[value="dansband"],
button[value="60/70-tal"],
button[value="country"] {

    background: linear-gradient(180deg, #4e6fd3d8 0%, #2431A4 100%);
    box-shadow: 2px 2px 8px rgba(57, 56, 56, 0.5);

}


button[value="folkmusik"],
button[value="soul/r&b"] {
    background: linear-gradient(180deg, #eb4242df 0%, #CC0327 100%);
    box-shadow: 2px 2px 8px rgba(57, 56, 56, 0.5);


}

button[value="jazz"],
button[value="klassiskt"] {
    background: linear-gradient(180deg, #fea618b5 0%, #FF9921 100%);
    box-shadow: 2px 2px 8px rgba(57, 56, 56, 0.5);


}


.header-img img {
    width: 390%;
    position: fixed;
    opacity: 110%;
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

    button[value="jazz"],
    button[value="pop"],
    button[value="hiphop"] {
        background: linear-gradient(180deg, #F8C8C8 0%, #FFADAD 100%);
        box-shadow: 2px 2px 8px rgba(57, 56, 56, 0.5);

    }

    button[value="folkmusik"],
    button[value="60/70-tal"],
    button[value="country"] {

        background: linear-gradient(180deg, #4E70D3 0%, #2431A4 100%);
        box-shadow: 2px 2px 8px rgba(57, 56, 56, 0.5);

    }

    button[value="dansband"],

    button[value="soul/r&b"] {
        background: linear-gradient(180deg, #EB4242 0%, #CC0327 100%);
        box-shadow: 2px 2px 8px rgba(57, 56, 56, 0.5);


    }

    button[value="elektroniskt"],
    button[value="klassiskt"] {
        background: linear-gradient(180deg, #FEA418 0%, #FF9921 100%);
        box-shadow: 2px 2px 8px rgba(57, 56, 56, 0.5);


    }
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
        grid-template-rows: repeat(2, 1fr);
        align-items: center;
        text-transform: uppercase;
        text-align: center;
        overflow: hidden;
        
    }

    .header-img img {
        max-width: 130%;
        position: relative;
        opacity: 100%;
        z-index: -2;
        left: -8rem;
        top: -5rem;

    }

    .header-img * {
        overflow: hidden;
    }


    .container-category-buttons {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        justify-items: stretch;
        gap: 1rem;
        padding: 0, 2rem, 0, 2rem;



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
        top: -4rem;
        margin-bottom: -2rem;

    }

}
</style>