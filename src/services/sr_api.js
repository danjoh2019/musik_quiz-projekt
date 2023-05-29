const BASE_URL = "https://api.sr.se/api/v2";

let allIds = []
/**
 * gets the data matching the given urlString
 * 
 * @param urlString - a string containing endpoint from where data should be collected
 * @returns the data collected from provided string
 */
async function getJson(urlString) {
    const response = await fetch(`${BASE_URL}${urlString}`)

    if (!response.ok) {
        throw new Error("Något gick fel när låtarna hämtades, försök igen")
    }
    const json = await response.json()

    return json
}
/**
 * Goes through all channels in endpoint "/channels?format=json&size=500"
 * and saves the id to a list
 * 
 * @returns a list of all existing channel ids
 */

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