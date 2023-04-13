const BASE_URL = "https://api.sr.se/api/v2";

async function getAllSongs() {

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

    const response = await fetch(`${BASE_URL}/playlists/getplaylistbychannelid?id=164&startdatetime=${todayString}&format=json&size=600`)

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

export { getAllSongs }