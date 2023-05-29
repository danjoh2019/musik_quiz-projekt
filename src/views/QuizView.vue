
<template>
    <div class="quiz-container">
        <div class="header">
            <p>
                Rätt: {{ guesses[0] }}
            </p>
            <h1>{{ genre }}</h1>

            <p>{{ totalGuesses }}/10</p>
        </div>
        <div class="center-body">
            <div v-if="loading">

                <div class="loader-circle-7"></div>
            </div>
            <div class="error-container">
                {{ errorMessage }}

            </div>
            <div v-if="!loading">
                <div v-if="!this.finished">
                    <div class="songs">
                        <div id="scorecount">
                            <div id="progress">
                                <div class="score correct"> {{ guesses[0] }}</div>
                                <div class="score wrong">{{ guesses[1] }} </div>
                                <div class="score total">{{ totalGuesses }}</div>
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
                </div>
            </div>
            <div v-if="finished" id="result">
                <p>Du fick {{ guesses[0] }} av 10 låtar rätt! <br>
                    {{ message }} <br></p>
                <button @click="playAgain">Spela igen!</button>
                <button @click="chooseCategory">Välj ny kategori</button>
            </div>
        </div>
    </div>
</template>
  
<script>
import { getQuizQuestions } from '../data/getQuiz.js'
import { generateTimespan, getFour, shuffleArray } from '../utils/misc.js'
import categories from '../data/categories.json'
/**
 * Gets called when a player clicks an option
*/
function updateProgressbar(res) {
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

    /** guesses = [0] = correct, [1] = incorrect, [2] = total guesses */
    data() {
        return {
            songs: [],
            loading: true,
            genre: null,
            alternatives: [],
            question: [],
            category: [],
            guesses: [0, 0, 10],
            totalGuesses: 0,
            finished: false,
            message: "",
            errorMessage: ""
        }
    },

    methods: {
        /**
         * Gets called when the page is mounted, collects all song from the selected category
        */

        async getAllSongs(id, dateString) {
            try {
                this.songs = await getQuizQuestions(id, dateString)
                this.loading = false
                this.displayQuestions(this.songs)
            } catch (err) {
                this.loading = true
                this.errorMessage = err.message
            }
        },

        /**
         * Called on mounted, isClicked and playAgain
         * Called when mounted and everytime player clicks on option
         * Calls method getForur to generate 4 new songs to alternatives list
         * takes song [0] and adds it to question list (This gives us the song title in the questionbox)
         * Then shuffles alternatives so that correct answer isn't always the first option
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
                this.errorMessage = error.message
            }
        },

        /**
         * called when a player clicks on an option
         * Remove already displayed questions and alternatives
         * compare player choice and correct answer to see if it's a match
         * When an alternative is clicked, generate four new song from songlist
         * updates result, when player has answered 10 questions the page shows the result by setting this.finished = true
         * @param artist the artist linked to the option that is clicked
         * @param event an event to get information about which optionscontainer isClicked
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
                this.finished = true;
                this.scoreMessage(this.guesses[0])
            }
            updateProgressbar(this.guesses);
        },
        
        playAgain() {
            this.finished = false;
            this.wrongAnswer = 0;
            this.totalGuesses = 0;
            this.guesses = [0, 0, 10];
            this.question = [];
            this.alternatives = [];

            this.displayQuestions(this.songs);
        },

        chooseCategory() {
            this.$router.push('/category');
        },
        /**
         * Called when totalGuesses === 10 (player has guessed on 10 songs)
        */
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
.header h1 {
    font-family: Adventuro, Arial, Helvetica, sans-serif;
    color: #FEA418;
    font-size: 1.4rem;
    margin-right: 2.5rem;

}

.header {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-around;
    text-align: center;
    padding: .2rem;
    background: #303BA1E5;
}

.center-body {
    display: flex;
    flex-direction: column;
    margin: 1rem;
    text-align: center;
}


body {
    background-color: white;
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
    border-color: #303BA1E5;
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
    font-family: Montserrat, 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
}

.question-container {
    display: flex;
    font-size: 1.1rem;
    font-weight: bold;
    height: 12rem;
    margin: 1rem;
    border-radius: .6rem;
    background: linear-gradient(180deg, #454FAB 0%, #3A44A8 59.37%, #2431A4 100%);
    box-shadow: 2px 2px 8px rgba(57, 56, 56, 0.5);
    padding: 1rem 2rem 0;
    align-items: center;
    justify-content: center;
    color: #FFB6C9;
    margin-bottom: 2rem;
}

.options-container,
.correct-container,
.incorrect-container {
    display: flex;
    font-weight: medium;
    font-size: .9rem;
    margin: .8rem;
    border-radius: .6rem;
    text-transform: none;
    height: 4rem;
    padding: 0 2rem 0;
    align-items: center;
    justify-content: center;
}

.options-container {
    background: linear-gradient(180deg, rgba(255, 145, 145, 0.7) 0%, rgba(255, 173, 194, 0.7) 100%);
    color: rgb(242, 52, 52);
}

.correct-container {
    background: #FEA418;
    color: white;
}

.incorrect-container {
    background: #E71212;
    color: white;
}

h1 {

    text-transform: uppercase;
    text-align: center;
}

#result {
    font-size: 1.75rem;

}

#result :first-child {
    margin: 2rem;
}

.header p {
    font-size: .9rem;
    text-align: center;
    align-items: center;
    color: white;
}

#progress {
    display: flex;
    flex-flow: row no-wrap;
    text-align: center;
    max-height: 2rem;
    min-height: 1rem;
    border: .1rem solid rgb(238, 239, 239);
    border-radius: .3rem;
    overflow: hidden;
    background-color: #ffadc1b9;
    margin: 1rem 1rem 0 1rem;
}

.score {
    width: 33%;
    font-size: 0px;
    color: #FFADC2;
    border-right: none;
    transition: 1s width;
}

.correct {
    display: none;
    background-color: #FEA418;

}

.wrong {
    display: none;
    background-color: rgb(253, 72, 72);

}

.total {
    border-radius: .5rem;
    opacity: 0.8;
    background-position: 7px 0, 7px 0, 0 0, 0 0;
    background-size: 7px 7px;
    background-repeat: repeat;
}

button {
    background: #4e6fd3;
    box-shadow: 2px 2px 8px rgba(57, 56, 56, 0.5);
    width: 12rem;
    padding: 1rem;
    border-radius: .5rem;
    margin: .5rem;
    border: none;
    font-family: 'Adventuro', 'Montserrat', Impact, Haettenschweiler, 'Arial Narrow Bold', sans-serif;
    font-size: .8rem;
    letter-spacing: 0.14rem;
    text-transform: uppercase;
    color: rgb(248, 248, 250);
}
@media screen and (max-height: 740px) {
    .question-container{
        font-size: .9rem;
        height: 9rem;
    }
    .options-container{
        font-size: .75rem;
    }
}

@media screen and (min-width: 560px) {
    button {
        margin: 1rem;
        padding: 1rem;

    }

    .header {
        background-color: white;
        padding: 0;
        margin: 0;
    }

    .header p {
        color: #4E70D3;

    }

    .quiz-container {
        margin: 1rem;
    }
}

@media screen and (min-width: 800px) {
    .header {
        margin: 0 8rem 0 8rem;
    }

    .center-body {
        margin: 1rem 10rem 0 10rem;
    }

    .question-container {
        font-size: 1.5rem;
        height: 20rem;
    }

    .options {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        text-align: center;
    }

    .options-container,
    .incorrect-container,
    .correct-container {
        font-size: auto;
        height: 5rem;
    }

    #progress {
        height: 1.5rem;
    }
}</style>

