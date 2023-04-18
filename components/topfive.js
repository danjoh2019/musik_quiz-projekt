import { getTopFiveFromYear } from "./javascript.js"

export default {
    data() {
        return {
            TenYearsAgo: [],
            FiveYearsAgo: String,
            Today: String
        }
    },
    async created() {
        this.TenYearsAgo = await getTopFiveFromYear(2013)
        this.FiveYearsAgo = await getTopFiveFromYear(2018)
        this.Today = await getTopFiveFromYear(2023)
    },
    template:
        `<div class="historyfive">
        <ul>
        <li v-for="song of TenYearsAgo">{{ song.name }}</li>
        </ul><ul>
        <li v-for="song of FiveYearsAgo">{{ song.name }}</li>
        </ul><ul>
        <li v-for="song of Today">{{ song.name }}</li>
        </div>`
}