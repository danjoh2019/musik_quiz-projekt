//import { getAllSongs, getQuiz, getTopFiveFromYear } from "./components/javascript.js"

export default {
    props: {
        buttonText: String,
        id: {
            type: Number,
            default: 164

        }
    },

    template: `<div>
                    <input type="button"
                        :value="buttonText"
                        :id="id"
                        @click="getQuiz">
                </div>`
}

