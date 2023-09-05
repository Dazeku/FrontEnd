<script setup>
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import { status } from '../states/status.js'
import { loggedUser } from '../states/loggedUser';
import { capitolo, getCapitolo } from '../states/capitolo';

const ch = useRoute().params.ch

const ready = ref(false)

onMounted( () =>{
    getCapitolo(ch,loggedUser.token).then( (ris) => {
        if(ris){
            ready.value = true
        }
    })
})
</script>

<template>
    <div v-if="ready" style="display: grid; grid-template-columns: 70vw">
        <div class="title">
            #{{ capitolo.numero }} - {{ capitolo.titolo }}
        </div>
        <div style="margin-left: 20px; margin-top: 30px;">
            {{ capitolo.testo }}
        </div>
    </div>
    <span style="color: red" v-if="status.success != undefined"> 
      <br> {{ status.message }} 
    </span>
    <span v-if="!ready">
      <br> Aspettare caricamento dati...
    </span>
</template>