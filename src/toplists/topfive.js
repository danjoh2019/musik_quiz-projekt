import { getJson, getAllChannelIds } from "../services/sr_api.js";

function countOccurances(songs) {
    const songCount = {}

    for (const array of songs) {
        for (const song of array.song) {
            const key = `${song.title} - ${song.artist}`;
            if (songCount[key]) {
                songCount[key]++
            } else {
                songCount[key] = 1
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

    return await getJson(`/playlists/getplaylistbychannelid?id=${id}&startdatetime=${fromDateString}&enddatetime=${toDateString}&format=json&size=600`)
}
/**
 * returns a list of top 5 songs and artist on all channels from a given year
 * 
 * 
 * @param year and number thar represents a year
 * @returns a list with most played songs and artist from a specific year
 */
async function getTopFiveFromYear(year) {
    const allChannels = await getAllChannelIds()
    const allSongs = []

    for (let id of allChannels) {
        allSongs.push(await getAllSongsFromYear(id, year))
    }
    const result = countOccurances(allSongs)
    return getTopSongs(result)
}

function getTopSongs(input) {
    const songArray = []
    for (const name in input) {
        songArray.push({ name: name, count: input[name] })
    }

    songArray.sort((o1, o2) => o2.count - o1.count)
    return songArray.slice(0, 5)
}

export { getTopFiveFromYear }