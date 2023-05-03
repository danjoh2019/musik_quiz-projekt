
<template>
    <div>
        <div class="container-category">
            <div class="header-category">
                <h2>Categories</h2>
            </div>
            <div class="background">
                <div class="content-category">
                    <div class="container-category-buttons">
                        <button v-for="category in categories" :key="category.id" :value="category.genre" :id="category.id"
                            @click="selectCategory(category.id, category.genre)
                                " class="category-button">
                            {{ category.genre }}
                        </button>
                    </div>
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

.song-container {
    color: white;
}

.background {
    align-items: center;
}

.container-category-buttons,
.content-category {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    justify-content: space-around;
}

.category-button {
    flex-grow: 1;
    flex-basis: auto;
    max-width: 100%;
    width: 10rem;
    height: 6rem;
    padding: 3rem;
    /* border-radius: 1rem; */
    border-radius: 20% / 20%;
    margin: 0.5rem;
    border: none;
    background-color: lightblue;
    font-family:  Impact, Haettenschweiler, 'Arial Narrow Bold', sans-serif;
    color: white;
    font-size: 1.4rem;
    letter-spacing: 0.3rem;
    text-transform: uppercase;
    cursor: pointer; 
}

button {
    display: flex;
    justify-content: center;
    align-items: center;
}

.category-button:hover {
    background-color:grey;
    color: white;
}

@media screen and (min-width: 560px) {

    .container-category-buttons,
    .content-category {
        display: grid;
        grid-template-columns: auto auto;
    }

    .category-button {
        width: 14rem;
        height: 10rem;
    }
}

@media screen and (min-width: 750px) {

.container-category-buttons,
.content-category {
    display: grid;
    grid-template-columns: auto auto auto;
}

.category-button {
    width: 14rem; 
}
}

</style>