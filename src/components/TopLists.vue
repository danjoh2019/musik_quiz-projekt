<script>
import { getTopFiveFromYear } from "../toplists/topfive.js"
import { subtractYears } from "../utils/misc.js"

export default {

    data() {
        return {
            tenYearsAgo: [],
            fiveYearsAgo: [],
            today: []
        }
    },
    async created() {
        // Denna if-sats fungerar inte. Sparas inte data i arrayerna när vi byter vy?
        // Eller är den felskriven?
        // Funkar det att spara arrayerna i sessionstorage?
        if (!this.tenYearsAgo.length > 0 && !this.fiveYearsAgo.length > 0 && !this.today.length > 0) {
        
            const data = [getTopFiveFromYear(subtractYears(10)),  getTopFiveFromYear(subtractYears(5)), getTopFiveFromYear(subtractYears(0))]
            const values = await Promise.all(data)

            this.tenYearsAgo = values[0]
            this.fiveYearsAgo = values[1]
            this.today = values[2]
        }
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