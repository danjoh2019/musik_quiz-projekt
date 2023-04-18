import { getTopFiveFromYear } from "./javascript.js"

export default {
    data() {
        return {
            TenYearsAgo: {},
            FiveYearsAgo: {},
            Today: []
        }
    },
    async created() {
        this.TenYearsAgo = await getTopFiveFromYear(2013)
        this.FiveYearsAgo = await getTopFiveFromYear(2018)
        this.Today = await getTopFiveFromYear(2023)
    },
    template:
        `<div class="historyfive">
        Mest spelade låtarna i dag...
        <ul><span>För tio år sedan:</span>
        <li v-for="song of TenYearsAgo">{{ song.name }}</li>
        </ul><ul><span>För fem år sedan:</span>
        <li v-for="song of FiveYearsAgo">{{ song.name }}</li>
        </ul><ul><span>Senaste dygnet:</span>
        <li v-for="song of Today">{{ song.name }}</li>
        </ul>
        </div>`
}