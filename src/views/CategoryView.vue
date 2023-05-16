
<template>
    <div class="container-category">
        <div class="header-category">
            <!--<h1>Quiz</h1>-->
            <div class="header-img"><img src="../assets/img/dancing.jpg" alt="illustration of people dancing"></div>
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
    display: flex;
    align-items: center;
    font-family: 'Montserrat', Impact, Haettenschweiler, 'Arial Narrow Bold', sans-serif;
    text-transform: uppercase;
    text-align: center;

}
button {
    display: flex;
    justify-content: center;
    align-items: center;

}
.category-button {
    flex-shrink: 1;
    width: 15rem;
    max-height: 10rem;
    height: auto;
    padding: 4rem;
    border-radius: 1rem;
    margin: 0.5rem;
    border: none;
    font-family: 'Montserrat', Impact, Haettenschweiler, 'Arial Narrow Bold', sans-serif;
    font-size: .8rem;
    letter-spacing: 0.1rem;
    background: linear-gradient(180deg, #4E70D3 0%, #2431A4 100%);
    box-shadow: 2px 2px 8px rgba(57, 56, 56, 0.5);
    text-transform: uppercase;
    color: white;


}

button[value="pop"],
button[value="elektroniskt"],
button[value="hiphop"] {
    background: linear-gradient(180deg, #F8C8C8 0%, #FFADAD 100%);
    box-shadow: 2px 2px 8px rgba(57, 56, 56, 0.5);

}

button[value="dansband"],
button[value="60s/70s"] {

    background: linear-gradient(180deg, #4E70D3 0%, #2431A4 100%);
    box-shadow: 2px 2px 8px rgba(57, 56, 56, 0.5);

}

button[value="folkmusik"],
button[value="soul/r&b"] {
    background: linear-gradient(180deg, #EB4242 0%, #CC0327 100%);
    box-shadow: 2px 2px 8px rgba(57, 56, 56, 0.5);


}

button[value="klassiskt"],
button[value="jazz"] {
    background: linear-gradient(180deg, #FEA418 0%, #FF9921 100%);
    box-shadow: 2px 2px 8px rgba(57, 56, 56, 0.5);


}
.header-img img {
    width: 170rem;
    position: fixed;
    opacity: 50%;
    z-index: -2;
    left: -87rem;
    top: -1rem;
}

/* ---------------- FOR SMALL SCREEN --------------*/

@media screen and (min-width: 576px) {
    /* Kod för "small" hamnar här */
}
/* ---------------- MEDIUM --------------*/

@media screen and (min-width: 768px) {
    /* Kod för "medium" hamnar här */
}
/* ---------------- LARGE --------------*/

@media screen and (min-width: 992px) {
    .container-category-buttons {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        justify-items: center;
        width: 100%;
    
    }
}
/* ---------------- X-LARGE --------------*/

@media screen and (min-width: 1200px) {
    .header-img img {
        position: relative;
        width: 150%;
        z-index: -2;
        margin: 0rem;
        margin-bottom: -4rem;
        top: -10rem;
        left: -7rem;
    
    }
    
    .header-img {
        overflow: hidden;
    }
    
    
    .container-category {
        display: grid;
        grid-template-rows: repeat(2, 1fr);
        align-items: center;
       
        text-transform: uppercase;
        text-align: center;
    
    }
   

}

/*
.container-category {
    align-items: center;
    font-family: 'Montserrat', Impact, Haettenschweiler, 'Arial Narrow Bold', sans-serif;
    text-transform: uppercase;
    text-align: center;
}

.container-category-buttons {
    margin-top: 2rem;
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    padding: .5rem; 
}



.category-buttons {
    
    justify-items: stretch;

}


.category-button {
    flex-shrink: 1;
    max-width: 5rem;
    width: auto;
    max-height: 5rem;
    height: 5rem;
    padding: 4rem;
    border-radius: 1rem;
    margin: 0.5rem;
    border: none;
    font-family: 'Montserrat', Impact, Haettenschweiler, 'Arial Narrow Bold', sans-serif;
    font-size: .8rem;
    letter-spacing: 0.1rem;
    background: linear-gradient(180deg, #4E70D3 0%, #2431A4 100%);
    box-shadow: 2px 2px 8px rgba(57, 56, 56, 0.5);
    text-transform: uppercase;
    color: white;

}


button[value="pop"],
button[value="elektroniskt"],
button[value="hiphop"] {
    background: linear-gradient(180deg, #F8C8C8 0%, #FFADAD 100%);
    box-shadow: 2px 2px 8px rgba(57, 56, 56, 0.5);

}

button[value="dansband"],
button[value="60s/70s"] {

    background: linear-gradient(180deg, #4E70D3 0%, #2431A4 100%);
    box-shadow: 2px 2px 8px rgba(57, 56, 56, 0.5);

}

button[value="folkmusik"],
button[value="soul/r&b"] {
    background: linear-gradient(180deg, #EB4242 0%, #CC0327 100%);
    box-shadow: 2px 2px 8px rgba(57, 56, 56, 0.5);


}

button[value="klassiskt"],
button[value="jazz"] {
    background: linear-gradient(180deg, #FEA418 0%, #FF9921 100%);
    box-shadow: 2px 2px 8px rgba(57, 56, 56, 0.5);


}

button {
    display: flex;
    justify-content: center;
    align-items: center;

}
*/
/*
.header-img img {
    width: 170rem;
    position: fixed;
    opacity: 50%;
    z-index: -2;
    left: -87rem;
    top: -1rem;
}


@media screen and (min-width: 481px) {
    h1 {
        position: absolute;
        color: #EB4242;
        font-size: 8rem;
        padding: 1rem;
        border-radius: 2rem;
        background: linear-gradient(180deg, #f8c8c883 0%, #ffadad8b 100%);
    }

    .category-button {
    
            max-width: 7rem;
            width: auto;
            max-height: 7rem;
            height: auto;
        
        animation: ease-in bounceScroll 2s;
        font-weight: bold;
    }
    .container-category{
        margin-top: 2rem;
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        justify-content: center;
        padding: .5rem; 
    }


    .header-category {
        grid-column: span 4;
        overflow: hidden;
        border: none;
    }

    .container-category-buttons {
        grid-column: span 4;
        justify-items: stretch;

    }

   

    button:hover {
        position: relative;
        bottom: -.2rem;
        right: -.2rem;
        color: white;

    }


    button[value="pop"],
    button[value="folkmusik"],
    button[value="60s/70s"] {

        background: rgba(253, 145, 145, 0.7);
        box-shadow: 2px 2px 8px rgba(57, 56, 56, 0.5);


    }

    button[value="elektroniskt"] {

        background: linear-gradient(180deg, #4E70D3 0%, #2431A4 100%);
        box-shadow: 2px 2px 8px rgba(57, 56, 56, 0.5);


    }

    button[value="elektroniskt"],
    button[value="soul/r&b"] {
        background: linear-gradient(180deg, rgba(235, 66, 66, 0.9) 0%, rgba(204, 3, 39, 0.9) 100%);
        box-shadow: 2px 2px 8px rgba(57, 56, 56, 0.5);

    }

    button[value="dansband"],
    button[value="klassiskt"] {
        background: linear-gradient(180deg, rgba(254, 164, 24, 0.9) 0%, rgba(255, 153, 33, 0.9) 100%);
        box-shadow: 2px 2px 8px rgba(57, 56, 56, 0.5);

    }


    .header-img img {

        position: relative;
        opacity: 100%;
        width: 220%;
        left: -10rem;
        margin-bottom: -5.2rem;
        z-index: -2;
       
    }

    @keyframes fade-in {
        0% {

            opacity: 0;
        }

        50% {

            opacity: 50%;
        }

        100% {
            opacity: 100%;
        }
    }



    @media screen and (min-width: 769px) {


        .category-button {
            max-width: 20rem;
            width: auto;
            max-height: 20rem;
            height: auto;
            
            
        }

        .header-img img {
            z-index: -2;
            margin: 0rem;
            margin-bottom: -14rem;
            top: -7rem;
            left: -30rem;
        }
    }

    @media screen and (min-width: 1025px) {

        .header-img img {
            width: 150%;
            z-index: -2;
            margin: 0rem;
            margin-bottom: -12rem;
            top: -6rem;
        }

        .container-category-buttons {
            padding-top: 1rem;
            gap: 1.5rem;
            

        }

        .category-button {
            font-size: 1.2rem;
            font-family: 'Adventuro', 'Montserrat', Impact, Haettenschweiler, 'Arial Narrow Bold', sans-serif;
        }

    }

}*/</style>