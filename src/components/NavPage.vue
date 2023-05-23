<script setup>
import { RouterLink } from 'vue-router' 
</script>

<template>
  <div>
    <div class="nav">
      <div class="header-logo"><img src="../assets/img/logo-color.jpg" width="27" height="30" alt="musicquiz logo"></div>
      <RouterLink to="/">Start</RouterLink>
      <RouterLink to="/category"> Quiz</RouterLink>

      <a class="button" href="#popup1">Om oss</a>

      <div id="popup1" class="overlay">
        <div class="popup">
          <h2> Om oss </h2>
          <a class="close" href="#">&times;</a>
          <div class="content">
            <p>
              Välkomna till vårt musikquiz!
            </p>
            <p>
              Det är ett quiz där du kan sätta dina musikaliska kunskaper på prov.
            </p>
            <p>
              På startsidan visar vi vilka låtar som är de mest spelade låtarna det senaste dygnet på Sveriges Radios
              samtliga kanaler
              samt vilka låtar som spelades mest denna dag för fem och tio år sedan.
              I quiz-delen så hämtar vi vår data från spellistor från program som spelar den typ av musik som matchar
              quiz-rubriken.
            </p>
            <p>
              Projektet är skapat av Christopher, Daniel, David och Tilda som ett skolprojekt i kursen Javautvecklare hos
              Yrgo.
              Uppgiften var att skapa en webapplikation från ett av några förutbestämda API:n.
              Vår app hämtar sin data från Sveriges Radios öppna API.
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.header-logo {
  position: relative;
}
.header-logo img {
  top: 0.4rem;
  position: inherit;
}

.nav {
  display: flex;
  list-style-type: none;
  justify-content: center;
  position: sticky;
  padding: .45rem;
  font-family: "Montserrat", Impact, Haettenschweiler, 'Arial Narrow Bold', sans-serif;
  text-transform: uppercase;
  text-decoration: none;
  background: #5775CD;
}

a {
  display: flex;
  text-decoration: none;
  color: #ffffff;
  font-size: .8rem;
  margin: .9rem;
}

.overlay {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(20, 39, 77, 0.7);
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
  border-radius: .5rem;
  width: 90%;
  position: relative;
  text-transform: none;
  opacity: 80%;
  font-size: .85rem;
}
.popup h2 {
  margin-top: 0;
  color: #333;
  text-transform: uppercase;
}
.popup .close {
  position: absolute;
  top: .1rem;
  right: 1rem;
  transition: all 200ms;
  font-size: 2rem;
  font-weight: bold;
  text-decoration: none;
  color: #333;
}

.popup .close:hover {
  color: #0665d8;
}
.popup .content {
  max-height: 30%;
  overflow: auto;
}

@media screen and (min-width: 560px) {
  .nav {
    background: #f9cad5;
  }

  a {
    font-weight: bold;
  }
  .popup {
    width: 80%;
  }

  @media screen and (min-width: 760px) {
    .popup {
      width: 60%;
      font-size: 1rem;
    }

    a:hover {
      color: rgba(235, 66, 66, 0.9);
    }
  }
  @media screen and (min-width: 992px) {
    .nav {
      padding: 1rem;
    
    }
    a{
      font-size: 1.2rem;
    }
    .header-logo img {
      top: 0.7rem;
      left: 2rem;
      top: 1.5rem;
      position:fixed;
    }
  }

}</style>