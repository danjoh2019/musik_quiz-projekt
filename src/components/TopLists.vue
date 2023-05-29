<script>
import { getTopFiveFromYear } from "../toplists/topfive.js"
import { subtractYears } from "../utils/misc.js"
import HeaderImg from '../components/HeaderImg.vue';

const STORAGE_TENYEARS = 'storage-tenYearsAgo';
const STORAGE_FIVEYEARS = 'storage-fiveYearsAgo';
const STORAGE_TODAY = 'storage-today';

export default {
    components: {
        HeaderImg,
    },

    data() {
        return {
            tenYearsAgo: [],
            fiveYearsAgo: [],
            today: []
        }
    },

    /**
     * Getting data from sessionStorage for most popular songs on Sveriges radio last 24 hours, five years ago and ten years ago. 
     * If data does not exist in sessionStorage than we are getting it from API
     */

    async created() {
        this.tenYearsAgo = JSON.parse(sessionStorage.getItem(STORAGE_TENYEARS) ?? JSON.stringify(this.tenYearsAgo))
        this.fiveYearsAgo = JSON.parse(sessionStorage.getItem(STORAGE_FIVEYEARS) ?? JSON.stringify(this.fiveYearsAgo))
        this.today = JSON.parse(sessionStorage.getItem(STORAGE_TODAY) ?? JSON.stringify(this.today))

        if (!this.tenYearsAgo.length > 0 && !this.fiveYearsAgo.length > 0 && !this.today.length > 0) {

            const data = [getTopFiveFromYear(subtractYears(10)), getTopFiveFromYear(subtractYears(5)), getTopFiveFromYear(subtractYears(0))]
            const values = await Promise.all(data)

            this.tenYearsAgo = values[0]
            this.fiveYearsAgo = values[1]
            this.today = values[2]

            /** 
             * Setting data from most popular songs last 24 hours, five years ago and ten years ago in to sessionStorage
             */
            sessionStorage.setItem(STORAGE_TENYEARS, JSON.stringify(this.tenYearsAgo));
            sessionStorage.setItem(STORAGE_FIVEYEARS, JSON.stringify(this.fiveYearsAgo));
            sessionStorage.setItem(STORAGE_TODAY, JSON.stringify(this.today));
        }
    }
}
</script>

<template>
    <div class="container-toplists">
        <HeaderImg />
        <div class="songsFromYears">
            Mest spelade låtarna
        </div>

        <div class="content">
            <div class="historyfive">
                <!-- Most popular songs on Sveriges radio for ten years ago -->
                <ul id="tenYears"><span>Tio år sedan</span>
                    <li v-for="song of tenYearsAgo" :key="song.name">{{ song.name }}</li>
                </ul>
                <!-- Most popular songs on Sveriges radio for five years ago -->
                <ul id="fiveYears"><span>Fem år sedan</span>
                    <li v-for="song of fiveYearsAgo" :key="song.name">{{ song.name }}</li>
                </ul>
                <!-- Most popular songs on Sveriges radio last 24 hours -->
                <ul id="today"><span>Senaste dygnet</span>
                    <li v-for="song of today" :key="song.name">{{ song.name }}</li>
                </ul>
            </div>
        </div>
        <div class="border"></div>
    </div>
</template>

<style scoped>
.border {
    background-color: #5775CD;
    padding: 1.5rem;
}

.content {
    display: flex;
    flex-direction: column;
    padding-bottom: 11rem;
}

.container-toplists {
    background: linear-gradient(180deg, #fcf9f914 0%, #f0f6f9c8 15%, #fffffff0 100%);
}

.songsFromYears {
    font-family: Adventuro, Montserrat, Arial, Helvetica, sans-serif;
    color: #4160bd;
    text-transform: uppercase;
    text-align: center;
    padding: 2.1rem;
    letter-spacing: 0.1rem;
    font-size: 1.4rem;
    background: rgba(255, 255, 255, 0.948);
    border: 1px solid #4160bd;
    margin: 1rem 2rem 1rem 2rem;

}

.historyfive {
    font-family: Montserrat, Arial, Helvetica, sans-serif;
    display: flex;
    flex-direction: column-reverse;
    justify-content: center;
    gap: 1.1rem;
    letter-spacing: .05rem;
    padding: 1rem;
}

.historyfive ul span {
    font-weight: bold;
    color: #4160bd;
    text-transform: uppercase;
    font-size: 1rem;
    font-size: .9rem;
    padding-bottom: .8rem;
    font-family: Adventuro, Arial, Helvetica, sans-serif;
    letter-spacing: .15rem;
}

.historyfive ul {
    border-radius: .4rem;
    list-style-type: none;
    margin: 0;
    font-size: .9rem;
    text-align: center;
    background: white;
    border: 1px solid #4160bd;
    padding: .5rem;
    color: #5775CD;
}

.historyfive ul>:nth-of-type(1) {
    padding-top: .2rem;
}

.historyfive ul>* {
    margin: .3rem;
}
/* If screen at least is 576px */
@media screen and (min-width: 576px) {

    .content {
        padding-bottom: 7rem;
        background: linear-gradient(180deg, #fcf9f900 15%, #f0f6f9a1 45%, #ffffff 100%);
    }

    .songsFromYears {
        margin: 3rem 7rem 1rem 7rem;
    }

    .historyfive ul {
        font-size: .75rem;
        color: white;
        padding-top: 3rem;
        padding-bottom: 3rem;
        padding-left: 1rem;
        margin-left: 2rem;
        margin-right: 2rem;
        background: #4955c0fe;
        text-align: center;
        border: 1px solid white;
    }

    #today span,
    #tenYears span,
    #fiveYears span {
        color: #ffd4dd;
        font-size: 1rem;
    }

    .historyfive {
        margin: 1rem 4rem 4rem 4em;
    }

}
/* If screen at least is 768px */
@media screen and (min-width: 768px) {
    .border {
        background-color: #ffd4dde5;
        padding: 1.5rem;
        bottom: 0;
        top: auto;
        width: 100%;
        position: relative;
    }

    .songsFromYears {
        font-size: 1.8rem;
        margin: 4rem 6rem 1rem 6rem;
    }

    .historyfive ul {
        font-size: .8rem;
        margin: 0rem;
    }

    .historyfive {
        margin: 0 5rem 0.5rem 5rem;
    }
}
/* If screen at least is 992px */
@media screen and (min-width: 992px) {
    .content {
        overflow: hidden;
        background: linear-gradient(180deg, #fcf9f900 15%, #ffffff 50%, #ffffff 100%);
    }

    .historyfive ul {
        font-size: .8rem;

    }

    .historyfive {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        margin: 5rem 5rem 3rem 5rem;

    }

    .songsFromYears {
        margin: 8rem 20rem 1rem 20rem;
        padding: 3rem;
        font-size: 1.5rem;
    }
}
</style>