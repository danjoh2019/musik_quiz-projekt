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
    
    const random = quizList.sort(() => 0.5 - Math.random())
    quizList = random.slice(0, 4)
    
    return quizList
  }

export { generateUrl, generateTimespan, subtractYears, getFour}