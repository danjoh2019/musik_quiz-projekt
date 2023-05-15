
<template>
    <div>
        <div class="container-category">
            <div class="header-category">
                <h2>Categories</h2>
            </div>
            <div class="content-category">
                <div class="container-category-buttons">
                    <button v-for="category in categories" :key="category.id" :value="category.genre" :id="category.id"
                        @click="selectCategory(category.id, category.genre)" class="category-button">
                        <p>{{ category.genre }}</p>
                    </button>
                </div>
            </div>
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
.header-category {
    font-family: Montserrat, Impact, Haettenschweiler, 'Arial Narrow Bold', sans-serif;
    text-transform: uppercase;
    text-align: center;
}

.container-category {
    align-items: center;
}

.container-category-buttons {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    justify-content: space-around;

}

.category-button {
    flex-grow: 1;
    flex-basis: auto;
    max-width: 100%;
    width: 8rem;
    height: 6rem;
    padding: 5rem;
    border-radius: 1rem;
    margin: 0.5rem;
    border: none;
    background-color: lightblue;
    font-family: Montserrat, Impact, Haettenschweiler, 'Arial Narrow Bold', sans-serif;
    font-weight: bold;
    font-size: .8rem;
    letter-spacing: 0.3rem;
    text-transform: uppercase;
    cursor: pointer;
}

.category-button p {
    padding: 2rem;
    color: white;
}

button {
    display: flex;
    justify-content: center;
    align-items: center;

}

.category-button:hover {
    background-color: grey;
    color: white;
}

@media screen and (min-width: 560px) {
    .container-category-buttons {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        justify-items: center;

    }



    .category-button {
        width: 14rem;
        height: 10rem;
    }
}

@media screen and (min-width: 750px) {

    .container-category-buttons {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        justify-items: center;

    }

    .category-button {
        width: 18rem;
        height: 10rem;
        font-size: 1rem;
        background: linear-gradient(180deg, #4E70D3 0%, #2431A4 100%);
        box-shadow: 2px 2px 8px rgba(57, 56, 56, 0.5);
        border-radius: 10px;
    }

    button[value="pop"],
    button[value="folkmusik"],
    button[value="60s/70s"]
     {

        background: rgba(253, 145, 145, 0.7);
        box-shadow: 2px 2px 8px rgba(57, 56, 56, 0.5);
        border-radius: 10px;

    }

    button[value="elektroniskt"] {

        background: linear-gradient(180deg, #4E70D3 0%, #2431A4 100%);
        box-shadow: 2px 2px 8px rgba(57, 56, 56, 0.5);
        border-radius: 10px;

    }

    button[value="elektroniskt"] ,
    button[value="soul/r&b"]
    {
        background: linear-gradient(180deg, rgba(235, 66, 66, 0.9) 0%, rgba(204, 3, 39, 0.9) 100%);
        box-shadow: 2px 2px 8px rgba(57, 56, 56, 0.5);
        border-radius: 10px;
    }

    button[value="dansband"] ,
    button[value="klassiskt"] {
        background: linear-gradient(180deg, rgba(254, 164, 24, 0.9) 0%, rgba(255, 153, 33, 0.9) 100%);
        box-shadow: 2px 2px 8px rgba(57, 56, 56, 0.5);
        border-radius: 10px;
    }
}
</style>