
<template>
    <div class="quiz-container">
        <h1>{{ genre }}</h1>
        <div class="songs">
            <div v-if="loading">Loading...</div>
            <div v-if="!loading">
                <div v-if="!this.showScore">
                    <div class="question-container">
                        <div v-for="question of question" :key="question.title">
                            {{ question.title }}
                        </div>
                    </div>

                    <div class="options">
                        <div v-for="song in alternatives" :key="song.artist + song.title" :song="alternatives"
                            @click="isClicked(song.artist, $event)">
                            <div class="options-container">
                                <p>{{ song.artist }}</p>
                            </div>
                        </div>
                    </div>

                    <!-- ---------------- SCORE COUNTER FIRST DRAFT ---------------- -->
                    <div id="scorecount">
                        <p>
                            {{ totalGuesses }} / 10
                        </p>
                        <div id="progress">
                            <div class="score correct"> {{ guesses[0] }}</div>
                            <div class="score wrong">{{ guesses[1] }} </div>
                            <div class="score total"></div>
                        </div>
                    </div>
                </div>
            </div>
            <div v-if="showScore">
                <div v-if="finished" id="result">
                    You got {{ correctAnswer }} / 10 songs right!
                </div>
            </div>
            <!-- ---------------- SCORE COUNTER FIRST DRAFT ---------------- -->
        </div>

    </div>
</template>
  
<script>

import { getQuizQuestions } from '../data/getQuiz.js'
import { generateTimespan, getFour } from '../utils/misc.js'

import categories from '../data/categories.json'


// ---------------- SCORE COUNTER FIRST DRAFT

function updateResults(res) {
    let results = res
    let correct = results[0]
    let wrong = results[1]
    let total = results[2]

    if (correct >= 1) {
        document.querySelector('.correct').style.display = "block"
        document.querySelector('.correct').style.width = correct * 10 + '%'

    }
    if (wrong >= 1) {
        document.querySelector('.wrong').style.display = "block"
        document.querySelector('.wrong').style.width = wrong * 10 + '%'
    }

    document.querySelector('.total').style.width = total * 10 + '%'

}

// ---------------- SCORE COUNTER FIRST DRAFT

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
            guesses: [0, 0, 10],
            correctAnswer: 0,
            wrongAnswer: 0,
            totalGuesses: 0,
            finished: false,
            showScore: false
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

        /**
         * displayQuestions(songs)
         * Called when mounted and everytime player clicks on option
         * Calls method getForur to generate 4 new songs to alternatives list
         * takes song [0] and adds it to question list (This gives us the song title in the questionbox)
         * Then shuffles alternatives so that correct answer isnät always thr first option
         * @param songs the full list of songs in the choosen category
         * **/

        displayQuestions(songs) {
            this.alternatives = getFour(songs)
            this.question.unshift(this.alternatives[0])
            this.alternatives.sort(() => 0.5 - Math.random())
        },

        /**
         * isClicked(artist, event)
         * Remove already displayed questions and alternatives
         * compare player choice and correct answer to see if it's a match
         * When an alternative is clicked, generate four new song from songlist
         * @param artist the artist linked to the option that is clicked
         * */

        isClicked(artist, event) {

            const optionsContainer = event.target.closest('.options-container')
            this.songs.forEach((song) => {
                for (const element of this.alternatives) {
                    if (song.title === element.title) {
                        this.songs.splice(0, 4);
                    }
                }
            })

            if (artist === this.question[0].artist) {
                console.log('YES')
                this.correctAnswer++
                this.guesses[0]++
                optionsContainer.classList.replace('options-container', 'correct-container')


            } else {
                optionsContainer.classList.replace('options-container', 'incorrect-container')
                this.guesses[1]++
            }

            if (this.question.length === 1) {
                this.question.pop();
            }

            setTimeout(function () {
                optionsContainer.classList.remove('correct-container', 'incorrect-container');
                optionsContainer.classList.add('options-container');
                this.displayQuestions(this.songs);
            }.bind(this), 400);

            this.totalGuesses++;
            this.guesses[2]--;

            if (this.totalGuesses === 10) {
                /* this.loading = true;  */
                this.showScore = true;
                this.finished = true;
            }
            updateResults(this.guesses);
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

        /* document.activeElement.blur() */
    }
}
</script>
  
<style scoped>
* {
    border: 1px solid lightpink;
}
.songs {
  /*  display: flex;*/
  
}

.quiz-container {
  /*  display: grid;
    gap: 1.5rem;
    grid-template-columns: auto;
    grid-template-rows: repeat(2fr, 2fr);*/
    
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

.correct-container {
    background: rgb(60, 209, 60);
    padding: 1rem;
    font-size: 1.5rem;
    margin: 1rem;
    border-radius: 1rem;
    text-transform: none;
    font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
}

.incorrect-container {
    background: rgb(206, 34, 34);
    padding: 1rem;
    font-size: 1.5rem;
    margin: 1rem;
    border-radius: 1rem;
    text-transform: none;
    font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
}

.options-container:hover {
    background: rgb(86, 172, 200);
}

h1 {
    color: lightblue;
    text-transform: capitalize;
}

/* ---------------- SCORE COUNTER FIRST DRAFT ---------------- */

#result {
    font-size: 3rem;
}

#scorecount {
    width: 27rem;
    border: .015rem solid black;
    border-radius: .5rem;
    padding: .2rem;
}

#scorecount p {
    font-size: larger;
    text-align: center;
    align-items: center;
}

#progress {
    width: 25rem;
    border: .2rem solid black;
    border-radius: .5rem;
    display: flex;
    flex-flow: row no-wrap;
}


.score {
    height: 100%;
    width: 33%;
    padding: 20px;
    color: white;
    border-right: 1px white solid;
    transition: 1s width;
}

.correct {
    display: none;
    border-radius: .2rem;
    background-color: rgb(19, 209, 19);
}

.wrong {
    display: none;
    border-radius: .2rem;
    background-color: rgb(253, 51, 51);
}

.total {
    border-radius: .2rem;
    background-color: #ffffff;
    opacity: 0.8;
    background-image: linear-gradient(135deg, #dedee3 25%, transparent 25%), linear-gradient(225deg, #dedee3 25%, transparent 25%), linear-gradient(45deg, #dedee3 25%, transparent 25%), linear-gradient(315deg, #dedee3 25%, #ffffff 25%);
    background-position: 7px 0, 7px 0, 0 0, 0 0;
    background-size: 7px 7px;
    background-repeat: repeat;
}

/* ---------------- SCORE COUNTER FIRST DRAFT ---------------- */

@media screen and (min-width: 800px) {

    .options {
        display: grid;
        grid-template-columns: auto auto;
        grid-template-rows: auto auto;

    }
}
</style>

