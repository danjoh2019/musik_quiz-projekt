
<template>
    <div class="wrapper">
        <div class="quiz-container">
            <h1>{{ genre }}</h1>
            <div v-if="loading">
                <div class="center-body">
                    <div class="loader-circle-7"></div>
                </div>
                <div class="error-container">
                    {{ message }}
                </div>
            </div>
            <div v-if="!loading">
                <div v-if="!this.showScore">
                    <div class="songs">
                        <div id="scorecount">
                            <p>
                                {{ guesses[0] }} rätt av 10
                            </p>
                            <div id="progress">
                                <div class="score correct"> {{ guesses[0] }}</div>
                                <div class="score wrong">{{ guesses[1] }} </div>
                                <div class="score total">{{ totalGuesses }}</div>
                            </div>
                        </div>
                    </div>
                    <div class="question-container">
                        <div v-for="question of question" :key="question.title" class="question">
                            <p>{{ question.title }}</p>
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
                </div>
                <div v-if="showScore">
                    <div v-if="finished" id="result">
                        Du fick {{ correctAnswer }} av 10 låtar rätt! <br>
                        {{ message }} <br>
                        <button @click="playAgain">Spela igen!</button>
                        <button @click="chooseCategory">Välj ny kategori</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
  
<script>
import { getQuizQuestions } from '../data/getQuiz.js'
import { generateTimespan, getFour, shuffleArray } from '../utils/misc.js'
import categories from '../data/categories.json'


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
            showScore: false,
            message: ""
        }
    },

    methods: {

        async getAllSongs(id, dateString) {
            try {
                this.songs = await getQuizQuestions(id, dateString)
                this.loading = false
                this.displayQuestions(this.songs)
            } catch (err) {
                this.loading = true
                this.message = err.message
            }
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
            try {
                this.alternatives = getFour(songs)
                this.question.unshift(this.alternatives[0])
                shuffleArray(this.alternatives)
            } catch (error) {
                this.loading = true
                console.log(error)
                this.message = error.message
            }
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
                this.correctAnswer++
                this.guesses[0]++
                optionsContainer.classList.replace('options-container', 'correct-container')
            }
            else {
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
                this.showScore = true;
                this.finished = true;
                this.scoreMessage(this.correctAnswer)
            }
            updateResults(this.guesses);
        },

        playAgain() {
            this.finished = false;
            this.showScore = false;
            this.correctAnswer = 0;
            this.wrongAnswer = 0;
            this.totalGuesses = 0;
            this.guesses = 0;
            this.question = [];
            this.alternatives = [];
            this.songs = [];

            this.displayQuestions(this.songs);
        },

        chooseCategory() {
            this.$router.push('/category');
        },

        scoreMessage(correctAnswer) {
            if (correctAnswer <= 1) {
                this.message = 'Pinsamt...'
            }
            else if (correctAnswer >= 2 && correctAnswer <= 6) {
                this.message = 'Bättre kan du...'
            }
            else if (correctAnswer >= 7 && correctAnswer <= 9) {
                this.message = 'Sedär, inte dåligt alls...'
            }
            else {
                this.message = 'Du är King/Queen of Quiz!!!'
            }
        }
    },
    /**
     * We get the name of the genre through our route (we send it as a query from CategoryView)
     * Find the matching object from the categories import (which is a json-file)
     * From the json file we get: id, genre (name), timspan (months) We generate a timespan string with generateTimeSpan
     * which gives us a url that sets enddate to yesterday and startdate x months back
     * Call method getSong to get all songs from that genre and timeperiod
     * */

    mounted() {
        this.genre = this.$route.query.genre
        this.category = categories.find(el => el.genre === this.genre)
        const dateString = generateTimespan(this.category.timespan)
        this.getAllSongs(this.category.id, dateString)
    }
}
</script>
  
<style scoped>
.wrapper {
    display: flex;
    justify-content: center;
}

.center-body {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
}

body {
    background-color: #202628;
}

.loader-circle-7 {
    position: relative;
    width: 70px;
    height: 70px;
    display: inline-block;
}

.loader-circle-7:before,
.loader-circle-7:after {
    content: "";
    display: block;
    position: absolute;
    border-width: 4px;
    border-style: solid;
    border-radius: 50%;
    width: 70px;
    height: 70px;
    border-color: #bbb;
    top: 0;
    left: 0;
}

.loader-circle-7:before {
    animation: loader-circle-7-scale 1s linear 0s infinite;
}

.loader-circle-7:after {
    opacity: 0;
    animation: loader-circle-7-scale 1s linear 0.5s infinite;
}

@keyframes loader-circle-7-scale {
    0% {
        transform: scale(0);
        opacity: 0;
    }

    50% {
        transform: scale(0.7);
        opacity: 1;
    }

    100% {
        transform: scale(1);
        opacity: 0;
    }
}

.quiz-container {
    width: 90%;
    font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
}

.question-container {
    display: flex;
    font-size: 1.2rem;
    font-weight: bold;
    height: 5rem;
    margin: 1rem;
    border-radius: 1rem;
    background: hotpink;
    padding: 0 2rem 0;
    align-items: center;
    justify-content: center;
}

.options-container {
    display: flex;
    font-size: 1.1rem;
    margin: .8rem;
    border-radius: 1rem;
    background: lightblue;
    text-transform: none;
    height: 4rem;
    padding: 0 2rem 0;
    align-items: center;
    justify-content: center;
}

.correct-container {
    background: rgb(70, 231, 70);
    padding: 1rem;
    font-size: 1.2rem;
    margin: 1rem;
    border-radius: 1rem;
    text-transform: none;
    text-align: center;
}

.incorrect-container {
    background: rgb(253, 72, 72);
    padding: .5rem;
    font-size: 1.2rem;
    margin: .5rem;
    border-radius: 1rem;
    text-transform: none;
    text-align: center;
}

.options-container:hover {
    background: rgb(86, 172, 200);
}

h1 {
    color: lightblue;
    text-transform: uppercase;
    text-align: center;
}

#result {
    font-size: 3rem;
}

#scorecount p {
    font-size: larger;
    text-align: center;
    align-items: center;
}

#progress {
    display: flex;
    flex-flow: row no-wrap;
    text-align: center;
    height: 1rem;
    border: .1rem solid lightblue;
    border-radius: .5rem;
    overflow: hidden;
}

.score {
    width: 33%;
    font-size: 0px;
    color: white;
    border-right: 1px white solid;
    transition: 1s width;
}

.correct {
    display: none;
    /* border-radius: .1rem; */
    background-color: rgb(70, 231, 70);
}

.wrong {
    display: none;
    /* border-radius: .1rem; */
    background-color: rgb(253, 72, 72);
}

.total {
    border-radius: .5rem;
    opacity: 0.8;
    background-position: 7px 0, 7px 0, 0 0, 0 0;
    background-size: 7px 7px;
    background-repeat: repeat;
}

@media screen and (min-width: 800px) {

    .quiz-container {
        width: 70%
    }

    .options {
        display: grid;
        grid-template-columns: auto auto;
        grid-template-rows: auto auto;
    }

    .question-container {
        font-size: 1.5rem;
        height: 20rem;
    }

    .question {
        /* padding-top: 6rem; */
    }

    .options-container {
        font-size: 1.5rem;
        height: 7rem;
    }

    .incorrect-container {
        font-size: 1.6rem;
        height: 7rem;
    }

    .correct-container {
        font-size: 1.6rem;
        height: 7rem;
    }
}
</style>

