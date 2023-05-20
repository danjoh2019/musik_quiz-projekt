<script>
import { getTopFiveFromYear } from "../toplists/topfive.js"
import { subtractYears } from "../utils/misc.js"

const STORAGE_TENYEARS = 'storage-tenYearsAgo';
const STORAGE_FIVEYEARS = 'storage-fiveYearsAgo';
const STORAGE_TODAY = 'storage-today';

export default {

    data() {
        return {
            tenYearsAgo: [],
            fiveYearsAgo: [],
            today: []
        }
    },

    async created() {

        //getting from sessionStorage
        this.tenYearsAgo = JSON.parse(sessionStorage.getItem(STORAGE_TENYEARS) ?? JSON.stringify(this.tenYearsAgo))
        this.fiveYearsAgo = JSON.parse(sessionStorage.getItem(STORAGE_FIVEYEARS) ?? JSON.stringify(this.fiveYearsAgo))
        this.today = JSON.parse(sessionStorage.getItem(STORAGE_TODAY) ?? JSON.stringify(this.today))

        if (!this.tenYearsAgo.length > 0 && !this.fiveYearsAgo.length > 0 && !this.today.length > 0) {

            const data = [getTopFiveFromYear(subtractYears(10)), getTopFiveFromYear(subtractYears(5)), getTopFiveFromYear(subtractYears(0))]
            const values = await Promise.all(data)

            this.tenYearsAgo = values[0]
            this.fiveYearsAgo = values[1]
            this.today = values[2]

            //setting to sessionStorage
            sessionStorage.setItem(STORAGE_TENYEARS, JSON.stringify(this.tenYearsAgo));
            sessionStorage.setItem(STORAGE_FIVEYEARS, JSON.stringify(this.fiveYearsAgo));
            sessionStorage.setItem(STORAGE_TODAY, JSON.stringify(this.today));
        }
    }
}
</script>

<template>
    <div class="songsFromYears">
        De mest spelade låtarna...
    </div>
    <div class="historyfive">
        <ul><span>i dag för tio år sedan:</span>
            <li v-for="song of tenYearsAgo" :key="song.name">{{ song.name }}</li>
        </ul>
        <ul><span>i dag för fem år sedan:</span>
            <li v-for="song of fiveYearsAgo" :key="song.name">{{ song.name }}</li>
        </ul>
        <ul><span>det senaste dygnet:</span>
            <li v-for="song of today" :key="song.name">{{ song.name }}</li>
        </ul>
    </div>
</template>

<style scoped>
.songsFromYears {
    font-family: Arial, Helvetica, sans-serif;
    font-size: 20px;
    color: rgb(99, 34, 160);
}

.historyfive {
    font-family: Arial, Helvetica, sans-serif;
    display: flex;
    flex-direction: column-reverse;
    justify-content: center;
    gap: 1rem;
    margin: 1rem;
}

.historyfive ul span {
    font-weight: bold;
    color: rgb(99, 34, 160);
}

.historyfive ul {
    background-color: lightblue;
    border-radius: 1rem;
    list-style-type: none;
    margin: 0;
    padding: 1rem;
}

@media screen and (min-width: 888px) {
    .historyfive {
        width: 40rem;
        margin: 2rem;
    }

    .historyfive ul {
        padding: .5rem;
    }
}
</style>