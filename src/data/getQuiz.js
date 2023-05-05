import { getJson } from '../services/sr_api'

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

  const set = array.filter(
    (value, index, self) =>
      index === self.findIndex((t) => t.title === value.title && t.artist === value.artist || value.artist == "Ej Angiven" || value.artist == "Various Artists")
  )
  //Test for checking if a list contains "Various Artists" remove later
  const findNotFound = set.find((value) =>
    (value.artist === "Various Artists"))

  console.log(findNotFound)
  return set

}

async function getGenre(id, dateString) {
  const endpoint = `/playlists/getplaylistbyprogramid?id=${id}${dateString}&format=json`
  const response = await getJson(endpoint)
  if (response === null) {
    console.log('No result')
  }
  return response.song
}

async function getQuizQuestions(id, dateString) {

  let response = await getGenre(id, dateString)
  const quizList = removeDuplicates(response)

  return quizList
}


export { getQuizQuestions }