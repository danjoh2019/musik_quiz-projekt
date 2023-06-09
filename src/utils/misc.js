/**
 * Returns a string with startdate and enddate
 * Get's todays date and subtract the months
 * todayString is always yesterdays date and startString is the result after subtracted months
 * 
 * @param months - a number that represent months
 * @returns returns a string containt a stardate and enddate
 */
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
/**
 * subtracts the current year with x years and returns the result
 * 
 * @param  years - a number that represents amount of years
 * @returns a year ex: 2007
 */

function subtractYears(years) {
  const today = new Date()
  const newYear = today.setFullYear(today.getFullYear() - years)
  const resultYear = new Date(newYear).toISOString().slice(0, 4)

  return resultYear
}
/**
 * Gets a list of songs
 * Shuffle the list and returns 4 random songs
 * 
 * @param quizList list of all songs
 * @returns a list of 4 songs
 */

function getFour(quizList) {
  return getRandomElementsFromArray(quizList, 4)
}

function getRandomElementsFromArray(array, count) {
  shuffleArray(array);

  for (let i = 0; i < array.length - count; ++i) {
    // Get the first 'count' elements from the shuffled array
    const randomElements = array.slice(i, i + count);

    // Extract the 'artist' property from each element
    const artists = randomElements.map(element => element.artist);

    // Check if all 'artist' values are unique
    if (new Set(artists).size === count) {
      return randomElements;
    }
  }

  throw new Error("Inga låtar kunde hittas")
}
/**
 * takes a list of songs and reorganize it
 * 
 * @param array - a list of songs
 */

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

export { generateTimespan, subtractYears, getFour, shuffleArray }