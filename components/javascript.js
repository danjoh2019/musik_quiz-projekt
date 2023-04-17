const BASE_URL = "https://api.sr.se/api/v2";

async function getAllSongs(urlString) {

    const response = await fetch(`${BASE_URL}${urlString}`)

    if (!response.ok) {
        // Fixa bättre felhantering
        throw new Error("Error message")
    }

    const json = await response.json()

    return json.song
}

async function getQuiz(genre) {
    const timeSpan = generateTimespan(6)
    const urlString = generateUrl(genre, timeSpan)
    const songs = await getAllSongs(urlString)

    return removeDuplicates(songs)
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






async function getAllSongsFromYear(id, year) {

    // TEST DATUM
    console.log("Today:")
    const today = new Date()
    const todayString = today.toISOString().slice(0, 10)

    const testYear = new Date(today)
    const testYearSubtract = testYear.setFullYear(testYear.getFullYear() - 1)
    const yearTest = new Date(testYearSubtract).toISOString().slice(0, 10)

    console.log(todayString)
    console.log(yearTest)
    console.log("--------------")
    // TEST DATUM

    const startDate = new Date(year, 1, 1).toISOString.slice(0, 10)
    const endDate = new Date(year, 12, 31).toISOString.slice(0, 10)

    const songs = new Array()

    for (let channelId of channelIds) {
        songs.push(getAllSongs(`/playlists/getplaylistbychannelid?id=${id}&startdatetime=${startDate}&enddatetime=${endDate}&format=json&size=600`))
    }

    return songs

}
    
async function getTop5FromYear(year) {
    const allChannels = await getAllChannelIds()
    const allSongs = []

    for (let id of allChannels) {
        allSongs.push(await getAllSongsFromYear(id, year))
    }

    console.log(allSongs)
}



async function getAllChannelIds() {
    const endpoint = `${BASE_URL}/channels?format=json&size=500`;
    const response = await fetchJson(endpoint);
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

export { getAllSongs, getQuiz }