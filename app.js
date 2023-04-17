import { getAllSongs, getTop5FromYear } from "./components/javascript.js"

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
    created() {
        // this.getSongs()
        // getTop5FromYear(2018)
        
        getAllSongs("/playlists/getplaylistbychannelid?id=164&startdatetime=2018-09-01&format=json&size=600")
    }
}
Vue.createApp(app).mount("#app")