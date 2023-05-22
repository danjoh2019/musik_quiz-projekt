const BASE_URL = "https://api.sr.se/api/v2";

let allIds = []

async function getJson(urlString) {
    const response = await fetch(`${BASE_URL}${urlString}`)

    if (!response.ok) {
        throw new Error("Något gick fel när låtarna hämtades, försök igen")
    }
    const json = await response.json()

    return json
}

async function getAllChannelIds() {
    if (allIds.length > 0) {
        return allIds
    }

    const endpoint = `/channels?format=json&size=500`;
    const response = await getJson(endpoint);
    const result = [];
    for (const channel of response.channels) {
        result.push(channel.id);
    }

    allIds = result
    return result;
}

export { getJson, getAllChannelIds }