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
    <div class="container-toplists">
        <div class="songsFromYears">
            Mest spelade låtarna
        </div>
        <div class="historyfive">
            <ul id="tenYears"><span>Tio år sedan</span>
                <li v-for="song of tenYearsAgo" :key="song.name">{{ song.name }}</li>
            </ul>
            <ul id="fiveYears"><span>Fem år sedan</span>
                <li v-for="song of fiveYearsAgo" :key="song.name">{{ song.name }}</li>
            </ul>
            <ul id="today"><span>Senaste dygnet</span>
                <li v-for="song of today" :key="song.name">{{ song.name }}</li>
            </ul>
        </div>
    </div>
</template>

<style scoped>
.songsFromYears {
    font-family: Adventuro, Montserrat, Arial, Helvetica, sans-serif;
    font-size: 1.8rem;
    color: rgb(236, 82, 115);
    text-transform: uppercase;
    text-align: center;
    padding: 2.2rem;
}

.historyfive {
    font-family: Montserrat, Arial, Helvetica, sans-serif;
    display: flex;
    flex-direction: column-reverse;
    justify-content: center;
    gap: 1.2rem;
    margin: 1rem;
    letter-spacing: .06rem;
}

.historyfive ul span {
    font-weight: bold;
    color: #EB4242;
    ;
    text-transform: uppercase;
    font-size: 1rem;
    padding-bottom: .8rem;
    font-family: Adventuro, Arial, Helvetica, sans-serif;
    letter-spacing: .1rem;
}

.historyfive ul {
    border-radius: 1rem;
    list-style-type: none;
    margin: 0;
    padding: 2rem;
    font-size: .65rem;
    text-align: center;
    background: #f9cad5;
    color: #EB4242;
}

@media screen and (min-width: 576px) {
    .historyfive ul span {
        color: white;
    }

    .historyfive ul {
        font-size: .7rem;
        color: white;
    }

    #tenYears span {
        color: #EB4242;
    }

    #today span {
        color:#FFADC2;
    }

    .historyfive ul:nth-of-type(3) {
        background: #454FAB;
        grid-column: 1;
        grid-row: 1;
    }

    .historyfive ul:nth-of-type(2) {
        background: #EB4242;
        grid-column: 2;
        grid-row: 1;
    }

    .historyfive ul:nth-of-type(1) {
        background: #FFADC2;
        grid-column: 3;
        grid-row: 1;
    }
}

@media screen and (min-width: 768px) {

    .historyfive {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        padding: 1.7rem;
    }

    .historyfive ul {
        padding: 2rem;
        font-size: .8rem;
    }
}
</style>