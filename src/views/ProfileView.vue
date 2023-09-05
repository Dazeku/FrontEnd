<script setup>
import { onMounted,reactive,ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { status } from '../states/status.js'
import { loggedUser,clearLoggedUser, deletetry } from '../states/loggedUser'
import { profile, nProd, nPref, getProfileById, modificaProfile } from '../states/profile';
import BookPreviewView from './BookPreviewView.vue';
import { fillOpera } from '../states/opere';

const router = useRouter()
const pr = useRoute().params.pr

const password = ref("")
const confpass = ref("")
const username = ref("")
const nome = ref("")
const cognome = ref("")

const prod = ref(false)
const pref = ref(false)

const arrays = reactive({
  prod: [],
  pref: []
})

function deleting(){
  if(deletetry(loggedUser.token)){
    clearLoggedUser()
    router.push('/')
  }
}

function change(){
  modificaProfile(username.value,nome.value,cognome.value,password.value,confpass.value,loggedUser.token).then( (ris) => {
    if(ris){
      getProfileById(pr, loggedUser.token)
    }
  })
}

onMounted( () =>{
    let a = getProfileById(pr,loggedUser.token)
    if(a){
      arrays.prod = profile.opereProdotte
      prod.value = true
      fillOpera(profile.operePreferite,loggedUser.token).then( (ris) => {
        arrays.pref = ris
        pref.value = true
      })
    }
})
</script>

<template>
    <div v-if="profile.username != undefined" style="display: grid; grid-template-columns: 60vw 20vw; padding-left: 5vw;">
      <div>
      <div class="title" style="margin-top: 20px;"> {{ profile.username }}</div>
      <div style="margin-top: 20px;"> 
          Nome: <span style="padding: 3px 10px; margin-left: 10px;"> 
                  {{ profile.nome + " " + profile.cognome }} 
                </span>
      </div>
      <div style="margin-top: 20px;"> {{ profile.email }}</div>
      <div v-if="pr == loggedUser._id" style="margin-left: 20px;">
        <button @click="deleting">Elimina l'account</button>
      </div>
      </div>

      <div v-if="pr == loggedUser._id" style="text-align: center;">
        <div style="margin-top: 10px;">Modifica dati</div>
        <form v-on:submit.prevent="change">
          <div>
            <label for="user">Modifica il tuo username</label> <br>
            <input type="text" id="user" name="user" v-model="username">
          </div>

          <div>
            <label for="nome">Modifica il tuo nome</label><br>
            <input type="text" id="nome" name="nome" v-model="nome">
          </div>

          <div>
            <label for="cogn">Modifica il tuo cognome</label><br>
            <input type="text" id="cogn" name="cogn" v-model="cognome">
          </div>

          <div>
            <label for="pass">Modifica la tua password</label><br>
            <input type="password" id="pass" name="pass" v-model="password">
          </div>

          <div>
            <label for="conf">Ripeti la tua password modificata</label><br>
            <input type="password" id="conf" name="conf" v-model="confpass">
          </div>

          <div style="margin-bottom: 15px;">
            <button type="submit">Invia</button>
          </div>
        </form>
        <span style="color: red" v-if="status.success != undefined"> 
          <br> {{ status.message }} 
        </span>
      </div>
      <div v-else></div>

      <div>
        <div v-if="prod" style="margin-top: 20px;"> 
              Ha creato {{ nProd }} opere <br>
          <div v-if="nProd!=0" style="display: grid;  grid-template-columns: 15vw 15vw 15vw 15vw">
            <template v-for="i in profile.opereProdotte">
              <BookPreviewView :book="i" />
            </template>
          </div>
          <div v-else>Nessuna opera disponibile</div>
        </div>
        <div v-if="pref" style="margin-top: 20px;"> 
              {{ nPref }} opere tra i preferiti<br>
          <div v-if="nPref!=0" style="display: grid;  grid-template-columns: 15vw 15vw 15vw 15vw">
            <template v-for="i in arrays.pref">
              <BookPreviewView :book="i" />
            </template>
          </div>
          <div v-else>Nessuna opera tra i preferiti</div>
        </div>
      </div>
    </div>


    <span v-if="profile.username == undefined">
      <br> Aspettare caricamento dati...
    </span>

    <span style="color: red" v-if="status.success != undefined"> 
          <br> {{ status.message }} 
        </span>
</template>