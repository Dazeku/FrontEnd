<script setup>
import { ref } from 'vue';
import { carosello, getTitle } from '../states/carosello';
import { risRicerca, getProfile } from '../states/risRicerca';
import BookPreviewView from './BookPreviewView.vue';
import ProfilePreviewView from './ProfilePreviewView.vue';

const stringa = ref('')
const opRis = ref(false)
const usRis = ref(false)

function search(){
  opRis.value = false
  usRis.value = false
  getTitle(stringa.value).then(() => {
    opRis.value = true
  })
  getProfile(stringa.value).then(() => {
    usRis.value = true
  })
}
</script>

<template>
  <div style="text-align: center;">
    <form v-on:submit.prevent="search">
        <label for="str">Cerca tra opere e autori</label> <br>
        <input type="text" id="str" name="str" v-model="stringa" required>

        <div style="margin-bottom: 15px;">
          <button type="submit">Invio</button>
        </div>
    </form>   
  </div>

  <div v-if="opRis" style="margin-top: 20px;">
    <p style="font-weight: bold;">Titoli trovati</p> <br>
    <div v-if="carosello.data.length == 0" style="margin-bottom: 10px;"> Nessun titolo trovato</div>
    <div v-else style="display: grid;  grid-template-columns: 20vw 20vw 20vw 20vw">
      <template v-for="i in carosello.data">
        <BookPreviewView :book="i" />
      </template>
    </div>
  </div>

  <div v-if="usRis" style="margin-top: 20px;">
    <p style="font-weight: bold;">Utenti trovati</p> <br>
    <div v-if="risRicerca.data.length == 0" style="margin-bottom: 10px;"> Nessun utente trovato</div>
    <div v-else style="display: grid;  grid-template-columns: 20vw 20vw 20vw 20vw">
      <template v-for="i in risRicerca.data">
        <ProfilePreviewView :users="i" />
      </template>
    </div>
  </div>
</template>

<style>
</style>
