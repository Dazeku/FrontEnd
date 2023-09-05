<script setup>
import { onMounted, ref } from 'vue';
import { RouterLink, useRoute } from 'vue-router';
import { status } from '../states/status.js'
import { loggedUser, add, remove } from '../states/loggedUser'
import { capitolo, modifyCapitolo, getCapitolo } from '../states/capitolo';

const ch = useRoute().params.id

const titolo = ref('')
const testo = ref('')
const visibilita = ref(false)

const ready = ref(false)

function mod(){
    let v = {}
    v.token = loggedUser.token
    v.visibile = visibilita.value
    v.id = capitolo._id
    if(titolo.value != ''){ v.titolo = titolo.value }
    if(testo.value != ''){ v.testo = testo.value }
    modifyCapitolo(v).then( (ris) => {
        if(ris){
            ready.value = false
            getCapitolo(ch,loggedUser.token).then( () => {
                visibilita.value = capitolo.visibile
                ready.value = true
            })
        }
    })
}

onMounted( () =>{
    getCapitolo(ch,loggedUser.token).then( (ris) => {
        if(ris){
            ready.value = true
        }
    })
})
</script>

<template>
    <div v-if="ready" style="display: grid; grid-template-columns: 40vw 40vw; text-align: center;">
        <div>
            <div class="title">
                #{{ capitolo.numero }} - {{ capitolo.titolo }}
            </div>
            <div style="margin-left: 20px; margin-top: 30px;">
                {{ capitolo.testo }}
            </div>
        </div>

        <div>
            <form v-on:submit.prevent="mod">
                <div style="margin-top: 15px;">
                    <label for="tit">Modifica il titolo</label> <br>
                    <input type="text" id="tit" name="tit" v-model="titolo">
                </div>
                <div style="margin-top: 15px;">
                    <label for="tes">Modifica il testo</label> <br>
                    <textarea id="tes" name="tes"  rows="40" cols="70" v-model="testo">
                        {{ capitolo.testo }}
                    </textarea>
                </div>
                <div style="margin-top: 15px;">
                    <label for="vis">Visibilità capitolo</label><br>
                    <button v-if="!visibilita" @click="visibilita = true" id="vis" name="vis">Rendi visibile</button>
                    <button v-else @click="visibilita = false" id="vis" name="vis">Nascondi capitolo</button>
                </div>
                <div style="margin-top: 15px;">
                    <label for="modifica">Crea opera</label><br>
                    <button type="submit" id="modifica" name="modifica">Crea</button>
                </div>
            </form>
        </div>
    </div>
    <span style="color: red" v-if="status.success != undefined"> 
      <br> {{ status.message }} 
    </span>
    <span v-if="!ready">
      <br> Aspettare caricamento dati...
    </span>
</template>