import { getAllSongs, getQuiz } from "./components/javascript.js"
import TopFive from "./components/topFive.js"
import categoryButton from "./components/categoryButton.js"

const app = {
    components: {
        topFive: TopFive
    },
    data() {
        return {
            quizArray: [],
            fourSongs: []
        }
    },
    methods: {
        async getSongs() {
            try {
                this.quizArray = await getAllSongs()

            } catch (err) {
                // Fixa bättre felhantering
                console.log("error")
                console.log(err)
            }
        },
        getFourRandomSongs() {
            const random = this.quizArray.sort(() => 0.5 - Math.random())
            this.fourSongs = random.slice(0, 4)
        },

        //Ändra id till pop, hämta 4 artister och en pop låt
        getFourPopArtists() {
            const random  = this.quizArray.sort(() => 0.5 - Math.random())
            this.fourSongs = random.slice(0, 4)
        }
    },
    async created() {
        this.quizArray = await getQuiz()
        
    }
}
const vueApp = Vue.createApp(app)

vueApp.component('categoryButton', categoryButton)

vueApp.mount("#app")