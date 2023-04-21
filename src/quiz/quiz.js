import { generateTimespan, generateUrl } from "../utils/misc.js"
import { getJson } from "../services/sr_api.js"

async function getQuiz(genre) {
    const timeSpan = generateTimespan(6)
    const urlString = generateUrl(genre, timeSpan)
    const songs = await getJson(urlString)

    return removeDuplicates(songs.song)
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

export { getQuiz }