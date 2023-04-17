import { getAllSongs, getQuiz } from "./components/javascript.js"

const app = {
    components: {
        getAllSongs
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
        }
    },
    async created() {
        this.quizArray = await getQuiz()

    }
}
Vue.createApp(app).mount("#app")