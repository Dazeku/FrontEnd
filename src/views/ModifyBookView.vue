<script setup>
import { onMounted, ref } from 'vue';
import { RouterLink, useRoute } from 'vue-router';
import { status } from '../states/status.js'
import { loggedUser } from '../states/loggedUser'
import { opera, getOperaById, modifyOpera} from '../states/opere';
import { creaCapitolo, deleteCapitolo } from '../states/capitolo';

const op = useRoute().params.id

const titolo = ref('')
const sinossi = ref('')
const visibilita = ref(false)

const tit = ref('')
const tes = ref('')

const ready = ref(false)

const creare = ref(false);

function mod(){
    let v = {}
    v.token = loggedUser.token
    v.visibile = visibilita.value
    v.id = opera._id
    if(titolo.value != ''){ v.titolo = titolo.value }
    if(sinossi.value != ''){ v.sinossi = sinossi.value }
    modifyOpera(v).then( (ris) => {
        if(ris){
            ready.value = false
            getOperaById(op,loggedUser.token).then( () => {
                visibilita.value = opera.visibile
                ready.value = true
            })
        }
    })
}

function create(){
    creaCapitolo({
        titolo: tit.value,
        testo: tes.value,
        id: op,
        token: loggedUser.token
    }).then( (ris) => {
        if(ris){
            window.alert("Capitolo creato correttamente")
            creare.value = false
            ready.value = false
            getOperaById(op,loggedUser.token).then( () => {
                visibilita.value = opera.visibile
                ready.value = true
            })
        }
    })
}
function destroy(id){
    deleteCapitolo({id: id, token: loggedUser.token}).then( (ris) => {
        if(ris){
            window.alert("Cancellazione effettuata")
            ready.value = false
            getOperaById(op,loggedUser.token).then( () => {
                visibilita.value = opera.visibile
                ready.value = true
            })
        }
    })
}

onMounted( () =>{
    getOperaById(op,loggedUser.token).then( () => {
        visibilita.value = opera.visibile
        ready.value = true
    })
})
</script>

<template>
    <div v-if="ready" style="display: grid; grid-template-columns: 55vw 30vw">
        <div>
            <div>
                <label for="creabutton">Vuoi creare un capitolo?</label><br>
                <button v-if="!creare" @click="creare = true" id="creabutton" name="creabutton">Crea</button>
                <button v-else @click="creare = false" id="creabutton" name="creabutton">Nascondi</button>
            </div>
            <div v-if="creare" style="text-align:center;">
                <form v-on:submit.prevent="create">
                    <div>
                        <label for="tit">Inserisci il titolo</label> <br>
                        <input type="text" id="tit" name="tit" v-model="tit" required>
                    </div>
                    <div>
                        <label for="tes">Inserisci il testo</label> <br>
                        <textarea id="tes" name="tes"  rows="40" cols="100" v-model="tes" required/>
                    </div>
                    <div>
                        <label for="crea">Crea opera</label><br>
                        <button type="submit" id="crea" name="crea">Crea</button>
                    </div>
                </form>
                <span style="color: red" v-if="status.success != undefined"> 
                    <br> {{ status.message }} 
                </span>
            </div>

            <div style="display: grid; grid-template-columns: 5vw 25vw 10vw; text-align: center;">
                <div>Numero </div>
                <div> Titolo </div>
                <div> Visibilita </div>
            </div>
            <div v-for="i in opera.listaCap" style="display: grid; grid-template-columns: 40vw 10vw">
                <RouterLink :to="`/modchapter/${i._id}`">
                    <div class="buttonlike" style="display: grid; grid-template-columns: 5vw 25vw 10vw; text-align: center;">
                        <div> {{ i.numero }} </div>
                        <div> {{ i.titolo }} </div>
                        <div> {{ i.visibile }} </div>
                    </div>                    
                </RouterLink>
                <button @click="destroy(i._id)">Cancella</button>
            </div>
            <div v-if="opera.listaCap.length == 0">Non hai ancora creato capitoli </div>
        </div>
        <div>
            <div style="margin-top: 15px;">
                Titolo: {{ opera.titolo }}
            </div>
            <div style="margin-top: 15px;">
                Sinossi: {{ opera.sinossi }}
            </div>
            <div style="margin-top: 15px;">
                Visibilità : {{ opera.visibile }}
            </div>
            <form v-on:submit.prevent="mod">
                <div style="margin-top: 15px;">
                    <label for="tit">Modifica il titolo</label> <br>
                    <input type="text" id="tit" name="tit" v-model="titolo">
                </div>
                <div style="margin-top: 15px;">
                    <label for="sin">Modifica la sinossi</label> <br>
                    <textarea id="sin" name="sin"  rows="6" v-model="sinossi"/>
                </div>
                <div style="margin-top: 15px;">
                    <label for="vis">Visibilità opera</label><br>
                    <button v-if="!visibilita" @click="visibilita = true" id="vis" name="vis">Rendi visibile</button>
                    <button v-else @click="visibilita = false" id="vis" name="vis">Nascondi opera</button>
                </div>
                <div style="margin-top: 15px;">
                    <label for="modifica">Modifica opera</label><br>
                    <button type="submit" id="modifica" name="modifica">Modifica</button>
                </div>
            </form>
            <span style="color: red" v-if="status.success != undefined"> 
                <br> {{ status.message }} 
            </span>
        </div>
    </div>
    <span style="color: red" v-if="status.success != undefined"> 
      <br> {{ status.message }} 
    </span>
    <span v-if="!ready">
      <br> Aspettare caricamento dati...
    </span>
</template>