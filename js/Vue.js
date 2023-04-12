const BASE_URL = "https://api.sr.se/api/v2";

async function getAllSongs() {
    const response = await fetch(`${BASE_URL}/playlists/getplaylistbychannelid?id=164&startdatetime=2018-09-01&format=json&size=600`)

    if (!response.ok) {
        // Fixa bättre felhantering
        throw new Error("Error message")
    }

    const json = await response.json()

    return removeDuplicates(json.song)
}

function removeDuplicates(songs) {
    const array = new Array()

    for (let song of songs) {
        const songObj = {
            title: song.title,
            artist: song.artist
        }
        array.push(songObj)
    }

    // Detta går kanske att lösa bättre med ett Set.

    const set = array.filter((value, index, self) =>
        index === self.findIndex((t) => (
            t.title === value.title && t.artist === value.artist
        ))
    )

    return set
}

const app = {
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
        this.getSongs()
    }
}
Vue.createApp(app).mount("#app")