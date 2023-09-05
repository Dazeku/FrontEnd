<script setup>
import { onMounted } from 'vue'
import { carosello, getCarosello, clearCarosello} from '../states/carosello.js'
import { status } from '../states/status.js'
import BookPreviewView from './BookPreviewView.vue'

const HOST = import.meta.env.VITE_API_HOST || `http://localhost:3000`
const API_URL = HOST+`/api/v1`

onMounted( () => {
  getCarosello()
})
</script>

<template>
  <div>
    <strong class="title">I titoli più famosi del momento</strong>
    <div v-if="carosello.success != undefined" style="display: grid;  grid-template-columns: 20vw 20vw 20vw 20vw">
      <template v-for="i in carosello.data">
        <BookPreviewView :book="i" />
      </template>
    </div>
    <span style="color: red" v-if="status.success != undefined"> 
      {{ status.message }} 
    </span>
    <span v-if="carosello.success == undefined">
      <br> Aspettare caricamento dati...
    </span>
  </div>
</template>

