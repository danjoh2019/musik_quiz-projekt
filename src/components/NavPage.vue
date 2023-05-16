<script setup>
import { RouterLink } from 'vue-router' 
</script>

<template>
  <div>
    <div class="nav">
      <div class="hamburger-icon">
        <div class="hamburger-top"></div>
        <div class="hamburger-middle"></div>
        <div class="hamburger-bottom"></div>
      </div>


      <RouterLink to="/">Start</RouterLink>
      <RouterLink to="/category"> Quiz</RouterLink>
      <!-- <RouterLink to="/About"> Om Oss</RouterLink> -->

      <a class="button" href="#popup1">Om oss</a>

      <div id="popup1" class="overlay">
        <div class="popup">
          <h2> Om oss </h2>
          <a class="close" href="#">&times;</a>
          <div class="content">
          <p>
            Welcome to our music quiz app, where you can test your music expertise and patience
            as you quess your way to the top. How many answers will you get right? <br>
            May the odds ever be in you favour!
          </p>

          <p>
            This app was made by Daniel, Tilda, David and Christopher as a schoolproject. We decided to make a music app
            beacuse
            it sounded like a splendid idea. The app pulls data from the Sveriges Radio API, which means that you'll have
            access to a large amount of information
            about songs that have been played on the radio. This data is displayed in the app to help you test your music
            knowledge.
            As a starting point the app shows which 5 songs that were played the most from
            three different time periods. More information will be added in the future!

          </p>
        </div>
        </div>
      </div>



    </div>
  </div>
</template>

<style scoped>
body {
  color: white;

}

.nav {
  display: flex;
  list-style-type: none;
  justify-content: center;
  width: 100%;
  padding: 1rem;
  background: rgba(235, 87, 87, 0.33);
  font-family: "Montserrat", Impact, Haettenschweiler, 'Arial Narrow Bold', sans-serif;
  text-transform: uppercase;
  text-decoration: none;
}

.nav {
  position: sticky;
}

a {
  display: flex;
  text-decoration: none;
  color: #303BA1;
  font-size: .8rem;
  margin: .9rem;


}

a:hover {
  color: rgba(235, 66, 66, 0.9);
}

/*.nav a:last-child{
  margin-left: auto;
}*/

/* POPUP */
.overlay {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.7);
  transition: opacity 500ms;
  visibility: hidden;
  opacity: 0;
}
.overlay:target {
  visibility: visible;
  opacity: 1;
}

.popup {
  margin: 70px auto;
  padding: 20px;
  background: #fff;
  border-radius: 5px;
  width: 30%;
  position: relative;
  transition: all 5s ease-in-out;
}

.popup h2 {
  margin-top: 0;
  color: #333;
  font-family: Tahoma, Arial, sans-serif;
}
.popup .close {
  position: absolute;
  top: 20px;
  right: 30px;
  transition: all 200ms;
  font-size: 30px;
  font-weight: bold;
  text-decoration: none;
  color: #333;
}
.popup .close:hover {
  color: #06D85F;
}
.popup .content {
  max-height: 30%;
  overflow: auto;
}

/* POPUP */

@media screen and (min-width: 560px) {

  /*
  .hamburger-top,
  .hamburger-middle,
  .hamburger-bottom {
    width: 1.2rem;
    height: .2rem;
    margin-bottom: .2rem;
    border-radius: 1rem;
    background-color: white;
  }
  */
  .hamburger-bottom {
    margin-bottom: 0rem;

  }

  a {
    font-weight: bold;
  }


  /*

  ul {
    list-style-type: none;
    margin: 0;
    padding: 0;
    overflow: hidden;
    background-color: #333;
  }

  li {
    float: left;
    border-right: 1px solid #bbb;
  }

  li:last-child {
    border-right: none;
  }

  li a {
    display: block;
    color: white;
    text-align: center;
    padding: 14px 16px;
    text-decoration: none;
  }

  li a:hover:not(.active) {
    background-color: #111;
  }*/

  .box{
    width: 70%;
  }
  .popup{
    width: 70%;
  }

}
</style>