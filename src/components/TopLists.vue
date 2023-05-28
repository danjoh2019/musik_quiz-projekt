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
        <HeaderImg />
        <div class="songsFromYears">
            Mest spelade låtarna
        </div>
        <div class="container-mobview">

            <div class="mobilePopup">
                <a class="button" href="#popupToday">Senaste dygnet</a>
                <div id="popupToday" class="overlay">
                    <div class="popup">
                        <a class="close" href="#">&times;</a>
                        <div class="content">
                            <div class="historyfive">
                                <ul id="today"><span>Senaste dygnet</span>
                                    <li v-for="song of today" :key="song.name">{{ song.name }}</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                <a class="button" href="#popupFiveYears">Fem år sedan</a>
                <div id="popupFiveYears" class="overlay">
                    <div class="popup">
                        <a class="close" href="#">&times;</a>
                        <div class="content">
                            <div class="historyfive">
                                <ul id="fiveYears"><span>Fem år sedan</span>
                                    <li v-for="song of fiveYearsAgo" :key="song.name">{{ song.name }}</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                <a class="button" href="#popupTenYears">Tio år sedan</a>
                <div id="popupTenYears" class="overlay">
                    <div class="popup">
                        <a class="close" href="#">&times;</a>
                        <div class="content">
                            <div class="historyfive">
                                <ul id="tenYears"><span>Tio år sedan</span>
                                    <li v-for="song of tenYearsAgo" :key="song.name">{{ song.name }}</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="desktop">
            <div class="content">
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
            <div class="border"></div>
        </div>

    </div>
</template>

<style scoped>
.border {
    background:  #5775CD;
    padding: .8rem;
}
.desktop {
    display: none;
}

.container-mobview {
    display: flex;
    flex-direction: column;
}

.container-toplists {
    background: linear-gradient(180deg, #fcf9f914 0%, #f0f6f9c8 15%, #fffffff0 100%);
}

.button {
    background-color: #eb5656;
    align-items: center;
    padding: 3rem;
    border-radius: .4rem;
    color: white;
    box-shadow: 1px 2px 2px rgba(57, 56, 56, 0.5);
    margin: 1rem 2rem 1rem 2rem;
}

a {
    display: flex;
    text-decoration: none;
    color: white;
    font-size: .8rem;
    margin: .9rem;
    font-family: 'Montserrat', 'Adventuro', Arial, Helvetica, sans-serif;
    text-transform: uppercase;
    flex-direction: column;
    letter-spacing: .1rem;
}

.overlay {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background: rgba(247, 163, 181, 0.867);
    transition: opacity 500ms;
    visibility: hidden;
    opacity: 0;
}

.overlay:target {
    visibility: visible;
    opacity: 1;
}

.popup {
    margin: 180px auto;
    padding: 5px;
    background: #fff;
    border-radius: .5rem;
    width: 90%;
    position: relative;
    text-transform: none;
    opacity: 100%;
    box-shadow: 1px 1px 4px rgba(78, 6, 24, 0.154);
}

.popup h2 {
    margin-top: 0;
    color: #eb5656;
    text-transform: uppercase;
    font-family: 'Adventuro', Arial, Helvetica, sans-serif;
    text-align: center;
}

.popup .close {
    position: absolute;
    top: .1rem;
    right: 1rem;
    transition: all 200ms;
    font-size: 2rem;
    font-weight: bold;
    text-decoration: none;
    color: #eb5656;
}

.popup .close:hover {
    color: #0665d8;
}

.popup .content {
    max-height: 40%;
    overflow: auto;
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
    margin: 5rem 2rem 3rem 2rem;

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
    color: #EB4242;
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
    padding: 2rem;
    font-size: .75rem;
    text-align: center;
    background: #f9cad5;
    padding: .5rem;
    text-align: left;
    font-size: .8rem;
    color: #EB4242;
}

.historyfive ul>:nth-of-type(1) {
    padding-top: .2rem;
}

.historyfive ul>* {
    margin: .3rem;
}

@media screen and (min-width: 576px) {
    .songsFromYears {
        margin: 3rem 7rem 1rem 7rem;
    }

    .container-toplists {
        background: linear-gradient(180deg, #fcf9f900 0%, #f0f6f98b 55%, #ffffff 100%);
    }

    .desktop {
        display: contents;
    }

    .mobilePopup {
        display: none;
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

@media screen and (min-width: 768px) {
    .border{
        background-color: #ffd4dde5;
        padding: 1.5rem;
        bottom: 0;
        top: auto;
        width: 100%;
        position:relative;
    }
    .songsFromYears {
        font-size: 1.8rem;
        margin: 4rem 6rem 1rem 6rem;
    }

    .historyfive ul {
        font-size: .8rem;
        margin: 0rem;
    }
    .historyfive{
        margin: 0 5rem 0.5rem 5rem;
    }
}

@media screen and (min-width: 992px) {
    .content {
        overflow: hidden;
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
    .container-toplists {
        background: linear-gradient(180deg, #fcf9f900 10%, #f0f6f965 75%, #ffffff 100%);
    }
}
</style>