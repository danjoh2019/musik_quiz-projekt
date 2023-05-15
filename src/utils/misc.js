function generateUrl(genre, date) {
  return `/playlists/getplaylistbychannelid?id=164${date}&format=json&size=600`
}

function generateTimespan(months) {
  const today = new Date()
  const yesterday = new Date(today)
  yesterday.setDate(today.getDate() - 1)
  const todayString = new Date(yesterday).toISOString().slice(0, 10)
  const startMonth = new Date(today)
  const startMonthSubtract = startMonth.setMonth(startMonth.getMonth() - months)
  const startString = new Date(startMonthSubtract).toISOString().slice(0, 10)

  return `&startdatetime=${startString}&enddatetime=${todayString}`
}

function subtractYears(years) {
  const today = new Date()
  const newYear = today.setFullYear(today.getFullYear() - years)
  const resultYear = new Date(newYear).toISOString().slice(0, 4)

  return resultYear
}

function getFour(quizList) {
  return getRandomElementsFromArray(quizList, 4)
}

function getRandomElementsFromArray(array, count) {
  shuffleArray(array);

  for (let i = 0; i < array.length - count; ++i) {
      // Get the first 'count' elements from the shuffled array
      const randomElements = array.slice(i, i+count);
  
      // Extract the 'artist' property from each element
      const artists = randomElements.map(element => element.artist);
  
      // Check if all 'artist' values are unique
      if (new Set(artists).size === count) {
          return randomElements;
      }
  }

  throw new Error("could not find enough unique")
}

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
  }
}

export { generateUrl, generateTimespan, subtractYears, getFour, shuffleArray }