const BASE_URL = "https://api.sr.se/api/v2";

async function fetchJson(url) {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error("response error");
  }
  return response.json();
}

async function getAllChannelIds() {
  const endpoint = `${BASE_URL}/channels?format=json&size=500`;
  const response = await fetchJson(endpoint);
  const result = [];
  for (const channel of response.channels) {
    result.push(channel.id);
  }
  return result;
}

async function getTopFiveArtists(date) {
  const channels = await getAllChannelIds();
  const artistCount = await countArtistOccurences(channels, date);
  return getTopArtists(artistCount, 5);
}

async function countArtistOccurences(channels, date) {
  // make a map of artist name to how often that name occures
  const artistCount = {};
  for (const id of channels) {
    const playlist = await getPlaylist(id, date);
    for (const song of playlist) {
      if (artistCount[song.artist]) {
        artistCount[song.artist]++;
      } else {
        artistCount[song.artist] = 1;
      }
    }
  }
  return artistCount;
}

async function getPlaylist(id, date) {
  if (!Number.isInteger(id)) {
    throw new Error(`${id} is not a valid channel id`);
  }

  const endpoint = `${BASE_URL}/playlists/getplaylistbychannelid?id=${id}&startdatetime=${date}&format=json&size=500`;
  const response = await fetchJson(endpoint);
  return response.song;
}

function getTopArtists(artistCount, numResults) {
  // make map into list of objects, sort them
  // and get the top names
  const artistList = [];
  for (const name in artistCount) {
    artistList.push({ name: name, count: artistCount[name] });
  }
  artistList.sort((o1, o2) => o2.count - o1.count);
  return artistList.slice(0, numResults).map((o) => o.name);
}

getTopFiveArtists("2018-04-05").then((res) => {
  const top5 = document.getElementById("top5");
  top5.innerHTML = "5 år sedan:";
  for (const name of res) {
    const li = document.createElement("li");
    li.innerText = name;
    top5.append(li);
  }
})

getTopFiveArtists("2013-04-05").then((res) => {
const top10 = document.getElementById("top10");
  top10.innerHTML = "10 år sedan:";
  for (const name of res) {
    const li = document.createElement("li");
    li.innerText = name;
    top10.append(li);
  }
});