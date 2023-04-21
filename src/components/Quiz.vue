<script>
import { getQuiz } from '../quiz/quiz.js'

export default {
    data() {
        return {
            quizArray: [],
            fourSongs: [],
            show: true
        }
    },
    props: {
        buttonText: String,
        id: {
            type: Number,
            default: 164
        }
    },
    methods: {
        async generateQuiz() {
            try {
                this.quizArray = await getQuiz(164)

            } catch (err) {
                // Fixa bättre felhantering
                console.log("error")
                console.log(err)
            }
            this.show = false
        },
        getFourRandomSongs() {
            const random = this.quizArray.sort(() => 0.5 - Math.random())
            this.fourSongs = random.slice(0, 4)
        }
    }
}
</script>

<template>
    <div>
        <div v-if="show">
            <input type="button" value="Rock" @click="generateQuiz">
            <input type="button" value="Pop" @click="generateQuiz">
            <input type="button" value="Sommarplågor" @click="generateQuiz">
        </div>

        <div v-else>
            <input type="button" id="getNewSongs" value="Get 4 random" @click="getFourRandomSongs">
            <div id="quiz" v-for="song of fourSongs" :key="song.artist + song.title">
                <span class="description">Artist: </span>{{ song.artist }}
                <span class="description">Låttitel: </span> {{ song.title }}
            </div>
        </div>
    </div>
</template>

<style scoped>
#getNewSongs {
    font-family: 'Courier New', Courier, monospace;
    font-weight: normal;
    padding: .5rem .5rem;
    width: 12rem;
    background-color: white;
    border: .1rem solid black;
    border-radius: .2rem;
    color: grey;
    font-size: 1rem;
    box-shadow: inset 2px 2px 3px #aaaaaa99, inset -2px -2px 3px rgba(0, 0, 0, 0.6);
    margin-bottom: 2rem;
}

#getNewSongs:hover {
    color: black;
    background-color: hsl(181, 29%, 90%);
    transform: scale(1.02);
    font-weight: bold;
}

#getNewSongs:active {
    font-weight: normal;
    transform: scale(1);
    box-shadow: inset -2px -2px 3px rgba(255, 255, 255, 0.6), inset 2px 2px 3px rgba(0, 0, 0, 0.6);
    background-color: white;
}

#quiz {
    font-family: Arial, Helvetica, sans-serif;
    font-size: larger;
}

#quiz .description {
    font-weight: bold;
    color: crimson;
}

</style>