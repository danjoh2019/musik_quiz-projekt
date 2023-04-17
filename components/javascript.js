const BASE_URL = "https://api.sr.se/api/v2";

async function getJson(urlString) {

    const response = await fetch(`${BASE_URL}${urlString}`)

    if (!response.ok) {
        // Fixa bättre felhantering
        throw new Error("Error message")
    }

    const json = await response.json()

    return json
}

async function getQuiz(genre) {
    const timeSpan = generateTimespan(6)
    const urlString = generateUrl(genre, timeSpan)
    const songs = await getJson(urlString)

    return removeDuplicates(songs.song)
}

function generateUrl(genre, date) {
    return `/playlists/getplaylistbychannelid?id=164${date}&format=json&size=600`
}

function generateTimespan(months) {
        const today = new Date()
        const todayString = today.toISOString().slice(0, 10)

        const startMonth = new Date(today)
        const startMonthSubtract = startMonth.setMonth(startMonth.getMonth() - months)
        const startString = new Date(startMonthSubtract).toISOString().slice(0, 10)
    
        return `&startdatetime=${startString}&enddatetime${todayString}`
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

function countOccurances(songs) {
    const songCount = {}

    for (const array of songs) {
        for (const song of array.song) {
            if (songCount[song.artist]) {
                songCount[song.artist]++
            } else {
                songCount[song.artist] = 1
            }
        }
    }
    return songCount    
}

async function getAllSongsFromYear(id, year) {
    const today = new Date()
    const yesterday = new Date(today)
    yesterday.setDate(today.getDate() - 1)

    const fromDate = new Date(yesterday.setFullYear(year))
    const toDate = new Date(today.setFullYear(year))

    const fromDateString = fromDate.toISOString().slice(0, 10)
    const toDateString = toDate.toISOString().slice(0, 10)
    
    return await getJson(`/playlists/getplaylistbychannelid?id=${id}&startdatetime=${yesterday}&enddatetime=${today}&format=json&size=600`)
}
    
async function countSongs(year) {
    const allChannels = await getAllChannelIds()
    const allSongs = []

    for (let id of allChannels) {
        allSongs.push(await getAllSongsFromYear(id, year))
    }

    const result = countOccurances(allSongs)

    console.log(getTopSongs(result))
}

function getTopSongs(input) {
    const songArray = []

    for (const name in input) {
        songArray.push({ name: name, count: input[name]})
    }

    songArray.sort((o1, o2) => o2.count - o1.count)
    return songArray.slice(0, 5)
}


async function getAllChannelIds() {
    const endpoint = `/channels?format=json&size=500`;
    const response = await getJson(endpoint);
    const result = [];
    for (const channel of response.channels) {
        result.push(channel.id);
    }
    return result;
}

async function getPlaylist(id, startDate, endDate) {
    if (!Number.isInteger(id)) {
        throw new Error(`${id} is not a valid channel id`);
    }

    const endpoint = `${BASE_URL}/playlists/getplaylistbychannelid?id=${id}&startdatetime=${startDate}&enddatetime=${endDate}&format=json&size=5000`;
    const response = await fetchJson(endpoint);
    return response.song;
}

export { getJson as getAllSongs, getQuiz, countSongs as getTopFiveFromYear }