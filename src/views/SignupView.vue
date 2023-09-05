<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { signintry } from '../states/loggedUser';
import { status, setStatus} from '../states/status.js'

const router = useRouter()

const email = ref("")
const password = ref("")
const confpass = ref("")
const username = ref("")
const nome = ref("")
const cognome = ref("")

function signinfun(){
  if(password.value != confpass.value){
    setStatus({success: false, message: "Le due password non coincidono"})
    return
  }
  signintry(username.value, email.value, password.value, nome.value, cognome.value).then(
    (suc) => {
      if(suc){
      router.push('/')
    }}
  )
}

</script>

<template>
  <div class="forms">
    <div style="font-size: larger; margin-top: 15px;">Signup</div>
    <form v-on:submit.prevent="signinfun">
    <div style="display: grid; grid-template-columns: auto auto; margin-top: 25px;">
      <div>
        <label for="user">Inserire un username</label> <br>
        <input type="text" id="user" name="user" v-model="username" required>
      </div>

      <div>
        <label for="em">Inserire la propria mail</label> <br>
        <input type="email" id="em" name="em" v-model="email" required>
      </div>
      
      <div>
        <label for="pass">Inserire la propria password</label> <br>
        <input type="password"  id="pass" name="pass" v-model="password" required>
      </div>

      <div>
        <label for="conf">Conferma la tua password</label> <br>
        <input type="password"  id="conf" name="conf" v-model="confpass" required>
      </div>

      <div>
        <label for="name">Inserire il proprio nome</label> <br>
        <input type="text" id="name" name="name" v-model="nome" required>
      </div>

      <div>
        <label for="sur">Inserire il proprio cognome</label> <br>
        <input type="text" id="sur" name="sur" v-model="cognome" required>
      </div>
    </div>
    <div style="margin-bottom: 15px;">
      <button type="submit">Invia</button>
    </div>
    <div style="color: red" v-if="status.success != undefined"> 
      {{ status.message }} 
    </div>
    </form>
  </div>
  
</template>
