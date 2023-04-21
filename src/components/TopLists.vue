<script>
import { getTopFiveFromYear } from "../toplists/topfive.js"

export default {
    data() {
        return {
            tenYearsAgo: [],
            fiveYearsAgo: [],
            today: []
        }
    },
    async created() {
        const data = [getTopFiveFromYear(2013),  getTopFiveFromYear(2018), getTopFiveFromYear(2023)]
        const values = await Promise.all(data)

        this.tenYearsAgo = values[0]
        this.fiveYearsAgo = values[1]
        this.today = values[2]
    }
}
</script>

<template>
    <div class="historyfive">
        Mest spelade låtarna i dag...
        <ul><span>För tio år sedan:</span>
            <li v-for="song of tenYearsAgo" :key="song.name">{{ song.name }}</li>
        </ul>
        <ul><span>För fem år sedan:</span>
            <li v-for="song of fiveYearsAgo" :key="song.name">{{ song.name }}</li>
        </ul>
        <ul><span>Senaste dygnet:</span>
            <li v-for="song of today" :key="song.name">{{ song.name }}</li>
        </ul>
    </div>
</template>

<style scoped>
.historyfive {
    display: flex;
    flex-direction: row;
    justify-content: center;
    gap: 2rem
}

.historyfive span {
    font-weight: bold;
    color: blueviolet;
}

.historyfive ul {
    border: .1rem solid black;
    list-style-type: none;
    margin: 0;
    padding: .2rem;
}
</style>