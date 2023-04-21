function generateUrl(genre, date) {
    return `/playlists/getplaylistbychannelid?id=164${date}&format=json&size=600`
}

function generateTimespan(months) {
    const today = new Date()
    const todayString = today.toISOString().slice(0, 10)

    const startMonth = new Date(today)
    const startMonthSubtract = startMonth.setMonth(startMonth.getMonth() - months)
    const startString = new Date(startMonthSubtract).toISOString().slice(0, 10)

    return `&startdatetime=${startString}&enddatetime${todayString}`
}

export { generateUrl, generateTimespan }