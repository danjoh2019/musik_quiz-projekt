import { getJson } from '../services/sr_api'
/**
 * returns a list of songs without duplicates
 * filters the list and removes artists and titles such as:
 * "ej angiven", "various artists" and "original sound"
 * 
 * @param songs - list of songs (songtitle + artist)
 * @returns a list of songs (songtitle + artist) without duplicates
 */
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
/**
 * return a list of songs from a specific radioprogram (genre)
 * 
 * @param id - number matching programid from the API, this is connected via categories.json and categoryView
 * @param  dateString - string with a date matching the string needed to get data from specific timeperiod
 * @returns a list of songs from a specific radioprogram (genre)
 */
async function getGenre(id, dateString) {
  const endpoint = `/playlists/getplaylistbyprogramid?id=${id}${dateString}&format=json`
  const response = await getJson(endpoint)

  return response.song
}
/**
 * Returns a list with all songs from a specifik category (programId)
 * 
 * @param id - number matching programid from the API, this is connected via categories.json and categoryView
 * @param dateString - string with a date matching the string needed to get data from specific timeperiod
 * @returns a list with songs from a certain radioprogram (genre)
 */
async function getQuizQuestions(id, dateString) {
  let response = await getGenre(id, dateString)
  const quizList = removeDuplicates(response)
  if (response.length === 0) {
   throw new Error("Inga låtar hittades")
  }
  return quizList
} 

export { getQuizQuestions }