
<template>
    <div>
        <h1>{{ genre }}</h1>
        <div class="songs">
            <div v-if="loading">Loading...</div>
            <div v-if="!loading">
                <div class="question-container">
                    <div v-for="question of question" :key="question.title">
                        {{ question.title }}
                    </div>
                </div>

                <div v-for="song in alternatives" :key="song.artist + song.title" :song="alternatives"
                    @click="isClicked(song.artist)">
                    <div class="options-container">
                        <p>{{ song.artist }}</p>
                    </div>
                </div>
                <div id="guesses">
                    {{ correct }} / {{ total }}
                </div>
            </div>
            <div v-if="finished" id="result">
                Wohoo! You got:
                {{ correct }} songs right
            </div>
        </div>

    </div>
</template>
  
<script>

import { getQuizQuestions } from '../data/getQuiz.js'
import { generateTimespan, getFour } from '../utils/misc.js'

import categories from '../data/categories.json'

export default {
    name: 'QuizView',

    data() {
        return {
            songs: [],
            loading: true,
            genre: null,
            alternatives: [],
            question: [],
            category: [],
            today: null,
            correct: 0,
            total: 0,
            finished: false
        }
    },

    methods: {

        async getAllSongs(id, dateString) {
            try {
                this.songs = await getQuizQuestions(id, dateString)
            } catch (err) {
                console.log('error')
            }
            this.loading = false
            this.displayQuestions(this.songs)
            console.log(this.songs.length)
        },

        displayQuestions(songs) {
            this.alternatives = getFour(songs)

            this.question.unshift(this.alternatives[0])
            this.alternatives.sort(() => 0.5 - Math.random())
        },

        /**
         * Documentation isClicked(song)
         * Remove already displayed questions and alternatives
         * compare player choice and correct answer to see if it's a match
         * When an alternative is clicked, generatw four new song fromsonglist
         * */
        isClicked(song) {

            this.songs.forEach((song) => {
                for (const element of this.alternatives) {
                    if (song.title === element.title) {
                        this.songs.splice(0, 4);
                    }
                }
            })
            //Remove console.log when done with displaying score
            console.log('Right Answer: ' + this.question[0].artist)
            console.log('Player Choice: ' + song)
            if (song === this.question[0].artist) {
                console.log('YES')
                this.correct++
            }

            if (this.question.length === 1) {
                this.question.pop()
            }
            this.displayQuestions(this.songs)

            this.total++

            if (this.total === 10) {
                this.loading = true
                this.finished = true
            }
        }
    },

    /**
     * We get the name of the genre through our route (we send it as a query from CategoryView)
     * Find the matching object from the categories import (which is a json-file)
     * From the json file we get: id, genre (name), timspan (months) We generate a timespan string with generateTimeSpan
     * which gives us a url that sets enddate to yesterday and startdate x months back
     * Call method getSong to gett all Song from that genre and timeperiod
     * */

    mounted() {
        this.genre = this.$route.query.genre
        this.category = categories.find(el => el.genre === this.genre)

        const dateString = generateTimespan(this.category.timespan)
        this.getAllSongs(this.category.id, dateString)
    }
}
</script>
  
<style>
.songs {
    display: flex;
}

.question-container {
    padding: 1rem;
    font-size: 1.5rem;
    font-weight: bold;
    margin: 1rem;
    border-radius: 1rem;
    background: hotpink;
    text-transform: none;
    font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
}

.options-container {
    padding: 1rem;
    font-size: 1.5rem;
    margin: 1rem;
    border-radius: 1rem;
    background: lightblue;
    text-transform: none;
    font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
}

h1 {
    color: lightblue;
    text-transform: capitalize;
}

#guesses {
    font-size: 2rem;
}

#result {
    font-size: 3rem;
}
</style>