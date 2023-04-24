<template>
    <div>
        <h1>{{ category }}</h1>
        <div class="songs">
            <div v-if="this.songs != null">
                <div v-for="song in songs" :key="song">
                    <p>{{ "Artist: " + song.artist + " " + "Title: " + song.title }}</p>
                </div>
            </div>
        </div>
        <div v-if="loading">Loading...</div>
    </div>
</template>
  
<script>
import { getQuizQuestions } from '../data/Quiz';
export default {
    name: "QuizView",

    data() {
        return {
            songs: [],
            startDate: "2022-09-23",
            endDate: "2023-03-23",
            loading: true,
            category: null,
        }
    },
    methods: {
        async getSongs(id) {
            this.loading = true
            try {
                this.songs = await getQuizQuestions(id, this.startDate, this.endDate);

            }
            catch (err) {
                console.log("error");
            }
            this.loading = false
        },
    },
    async mounted() {
        this.category = this.$route.query.genre
        this.getSongs(this.$route.params.id)

    },
}
</script>
  
<style >
.songs {
    display: flex;
    background: white;
    text-transform: none;
    font-family: Montserrat, Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;
}
</style>