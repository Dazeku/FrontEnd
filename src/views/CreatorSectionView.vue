<script setup>
import { onMounted, ref, reactive } from 'vue';
import { RouterLink } from 'vue-router'
import { loggedUser } from '../states/loggedUser';
import { fillOpera, creaOpera, deleteOpera } from '../states/opere';
import { status } from '../states/status';

const titolo = ref('')
const sinossi = ref('')
const generi = ref('')

const finito = ref(false);
const creare = ref(false);

const array = reactive({
  a: []
})

function creazione(){
  creaOpera({
    titolo: titolo.value, 
    sinossi: sinossi.value, 
    generi: generi.value, 
    token: loggedUser.token}).then( (ris) => {
    console.log(ris)
    if(ris){
      window.alert("Opera creata correttamente")
      finito.value = false
      loggedUser.opereProdotte.push(ris)
      fillOpera(loggedUser.opereProdotte,loggedUser.token).then( (ris) => {
        console.log(ris)
        array.a = ris
        finito.value = true
      })
    }
  })
}

function cancellazione(id){
  deleteOpera({id: id, token: loggedUser.token}).then( (ris) => {
    if(ris){
      window.alert("Cancellazione effettuata")
      finito.value = false
      var index = loggedUser.opereProdotte.indexOf(id);
      if (index > -1) { // only splice array when item is found
          loggedUser.opereProdotte.splice(index, 1); // 2nd parameter means remove one item only
      }
      fillOpera(loggedUser.opereProdotte,loggedUser.token).then( (ris) => {
        console.log(ris)
        array.a = ris
        finito.value = true
      })
    }
  })
}

onMounted( () =>{
    fillOpera(loggedUser.opereProdotte,loggedUser.token).then( (ris) => {
      console.log(ris)
      array.a = ris
      finito.value = true
    })
})
</script>

<template>
  <div v-if="loggedUser.token">
    <div class="title" style="margin-top: 30px; margin-left: 50px;">Sezione creatore</div>
    <div style="display: grid; grid-template-columns: 15vw 68vw; text-align: center;">
      <div>
        <label for="creabutton">Vuoi creare un opera?</label><br>
        <button v-if="!creare" @click="creare = true" id="creabutton" name="creabutton">Crea</button>
        <button v-else @click="creare = false" id="creabutton" name="creabutton">Nascondi</button>
      </div>
      <form v-on:submit.prevent="creazione">
        <div v-if="creare" style="display: grid; grid-template-columns: 17vw 17vw 17vw 17vw;">
          <div>
            <label for="tit">Inserisci il titolo</label> <br>
            <input type="text" id="tit" name="tit" v-model="titolo" required>
          </div>
          <div>
            <label for="sin">Inserisci la sinossi</label> <br>
            <textarea id="sin" name="sin"  rows="6" v-model="sinossi" required/>
          </div>
          <div>
            <label for="gen">Scrivi i generi, divisi da spazi</label> <br>
            <textarea id="gen" name="gen"  rows="6" v-model="generi"/>
          </div>
          <div>
            <label for="crea">Crea opera</label><br>
            <button type="submit" id="crea" name="crea">Crea</button>
          </div>
        </div>
      </form>
    </div>
    <div style="margin-top: 20px;"> 
              Ha creato {{ array.length }} opere <br>
          <div v-if="array.a.length != 0" style="display: grid;  grid-template-columns: 20vw 20vw 20vw 20vw">
            <div v-for="i in array.a">
              <RouterLink :to="`/modopera/${i._id}`">
                <div class="buttonlike">
                  <p>
                    Autore: {{ i.autore }} <br>
                    <b style="font-size: larger; font-weight: bold;"> {{ i.titolo }} </b> <br>
                    Generi: <template v-for="a in i.generi"> {{ a + " " }} </template> <br>
                    Follower: {{ i.nSeguaci }}
                  </p>
                </div>
              </RouterLink>
              <button @click="cancellazione(i._id)">Cancella l'opera</button>
            </div>
          </div>
          <div v-else>Nessuna opera creata</div>
        </div>
  </div>
  <div v-else class="title">Non si è autenticati</div>
  <span style="color: red" v-if="status.success != undefined"> 
          <br> {{ status.message }} 
  </span>
</template>
