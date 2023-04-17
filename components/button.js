const BASE_URL = "https://api.sr.se/api/v2";
let soundUrl = []


async function getAllSongs(id) {

    const response = await fetch(`${BASE_URL}/playlists/getplaylistbychannelid?id=${id}&startdatetime=2018-09-01&format=json&size=600`)

    if (!response.ok) {
        // Fixa bättre felhantering
        throw new Error("Error message")
    }
    console.log(response)
    const json = await response.json()

    return removeDuplicates(json.song)
}

async function getBroadcast(id) {
    const response = await fetch(`${BASE_URL}/broadcasts?programid=${id}&format=json`)

    if (!response.ok) {
        // Fixa bättre felhantering
        throw new Error("Error message")
    }

    const json = await response.json()
    const audioList = [];

    json.broadcasts.forEach(broadcast => {
        const audioUrl = broadcast.broadcastfiles[0].url;
        const channelId = broadcast.id;
        audioList.push({ id: channelId, url: audioUrl });
    });

    console.log(audioList);
    return audioList;
}

getBroadcast(3718);


async function getSongLink() {
    const response = await fetch(`${BASE_URL}/audiourltemplates/liveaudiotypes?format=json`)
    if (!response.ok) {
        // Fixa bättre felhantering
        throw new Error("Error message")
    }

    const json = await response.json()
    console.log(json)

    soundUrl.push(json.urltemplates)


}
getSongLink()

async function getAudioLink(id) {
    let templateId = "2"
    
    soundUrl.forEach(element => console.log(element))
    const response = await fetch(`${BASE_URL}/channels?liveaudiotemplateid=${templateId}&audioquality=hi&format=json`)
    if (!response.ok) {
        // Fixa bättre felhantering
        throw new Error("Error message")
    }

    const json = await response.json()
    const audioList = [];

    if (json.channels && json.channels.length > 0) {
        json.channels.forEach(channel => {
            const audioUrl = channel.liveaudio.url;
            const channelId = channel.id;

            audioList.push({ id: channelId, url: audioUrl });

        });
    }

    for (const audio of audioList) {
        console.log(audio)
    }

    const selectedAudio = audioList.find(audio => audio.id === id);
    if (selectedAudio) {
        const audio = new Audio(selectedAudio.url);
        //audio.play();
    }
}

getAudioLink(164)


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
            showQuiz: false,
            quizArray: [],
            fourSongs: [],
            id: "164"
        }
    },
    methods: {
        async getSongs(id) {
            try {
                this.quizArray = await getAllSongs(id)

            } catch (err) {
                // Fixa bättre felhantering
                console.log("error")
                console.log(err)
            }
        },

        getFourRandomSongs(event) {
            this.id = event.target.id
            console.log(this.id)
            this.getSongs(this.id)
            const random = this.quizArray.sort(() => 0.5 - Math.random())
            this.fourSongs = random.slice(0, 4)
        },

        toggleShowQuiz() {
            this.showQuiz = !this.showQuiz
        }
    },
    created() {
        this.getSongs(this.id)
    }
}
Vue.createApp(app).mount("#app")

