<script setup>
import { RouterLink, RouterView, useRouter } from 'vue-router'
import { loggedUser, clearLoggedUser } from "./states/loggedUser.js";

const router = useRouter()

function logout(){
  clearLoggedUser();
  router.push('/')
}
</script>

<template>
  <div>
  <header>
    <nav>
      <img alt="Vue logo" class="logo" src="./assets/logo.svg" width="25" height="25"/>
      <RouterLink to="/">Home</RouterLink>
      <RouterLink to="/titlesearch">Ricerca per titolo o autore</RouterLink>
      <RouterLink to="/creatorsection" v-if="loggedUser.token">Sezione Creatore</RouterLink>
      <RouterLink :to="`/profile/${loggedUser._id}`" v-if="loggedUser.token">Profilo</RouterLink>
      <RouterLink to="/login" v-if="!loggedUser.token">Login</RouterLink>
      <RouterLink to="/signup" v-if="!loggedUser.token">Signup</RouterLink>
      <button type="button" v-if="loggedUser.token" @click="logout">Logout</button>
      <span style="margin-left: 2vw;" v-if="loggedUser.token">Benvenuto {{ loggedUser.username }}!</span>
      <span style="margin-left: 2vw;" v-else>Non iscritto</span>
    </nav>
  </header>
  </div>

<div style="margin-top: 7rem; margin-left: 3rem;">
  <RouterView />
</div>


<figure id="footer">
  <img alt="Vue logo" class="logo" src="./assets/logo.svg" width="25" height="25"/>
  <span>Powered by VueJS</span>
</figure>

<div> Cos'altro ci può essere?</div>
 
 
  
</template>

<style>

#app {
  margin: 0;
  padding: 1vw;

  font-weight: normal;
}

header {
  position:fixed; /* fixing the position takes it out of html flow - knows
                   nothing about where to locate itself except by browser
                   coordinates */
  padding-left:5vw;           /* top left corner should start at leftmost spot */
  padding-top: 2rem;
  padding-bottom: auto;
  width:98vw;      /* take up the full browser width */
  z-index:200;  /* high z index so other content scrolls underneath */
  height:100px;     /* define height for content */
  background-color:rgb(34, 33, 33);
}

nav{
  display: inline;
  position: absolute;
}

nav a{
  display: inline-block;
  padding: 0 1rem;
}

#footer{
  position: fixed;
  left: 0;
  bottom: 0;
}


</style>