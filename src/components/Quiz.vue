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