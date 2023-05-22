import { getJson } from '../services/sr_api'

function removeDuplicates(songs) {
  const array = new Array()

  for (let song of songs) {
    const songObj = {
      artist: song.artist,
      title: song.title
    }
    array.push(songObj)
  }
  const set = array.filter(
    (value, index, self) =>
      index === self.findIndex((t) => t.title === value.title && t.artist === value.artist 
      || value.artist === "Ej Angiven" || value.artist === "Various Artists" || value.title === "original sound")
  )
  return set
}

async function getGenre(id, dateString) {
  const endpoint = `/playlists/getplaylistbyprogramid?id=${id}${dateString}&format=json`
  const response = await getJson(endpoint)

  return response.song
}

async function getQuizQuestions(id, dateString) {
  let response = await getGenre(id, dateString)
  const quizList = removeDuplicates(response)
  if (response.length === 0) {
   throw new Error("Inga låtar hittades")
  }
  return quizList
}

export { getQuizQuestions }