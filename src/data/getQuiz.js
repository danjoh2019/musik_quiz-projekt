import {getJson} from '../services/sr_api'

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
        index === self.findIndex((t) => t.title === value.title && t.artist === value.artist)
    )
  
    return set
  }

async function getGenre(id, startDate, endDate) {
    const endpoint = `/playlists/getplaylistbyprogramid?id=${id}&startdatetime=${startDate}&enddatetime=${endDate}&format=json&size=5000`
    const response = await getJson(endpoint)
    if (response === null) {
      console.log('No result')
    }
    return response.song
  }

  async function getQuizQuestions(id, startDate, endDate) {
    
    let response = await getGenre(id, startDate, endDate)
    const quizList = removeDuplicates(response)
    
    return getFour(quizList)
  }
  
  function getFour(quizList) {
    
    const random = quizList.sort(() => 0.5 - Math.random())
    quizList = random.slice(0, 4)
    
    return quizList
  }

  export { getQuizQuestions, getFour }