<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { loggedUser, logintry } from '../states/loggedUser';
import { status} from '../states/status.js'

const email = ref("")
const password = ref("")
const router = useRouter()

function loginfun(){
  logintry(email.value, password.value).then(
    (suc) => {
      if(suc){
      router.push('/')
    }}
  )
}

</script>

<template>
  <div class="forms">
    <div style="font-size: larger; margin-top: 15px;">Login</div>
    <form v-on:submit.prevent="loginfun">
    <div style="display: grid; grid-template-columns: auto auto; margin-top: 25px;">
      <div>
        <label for="em">Inserire la propria mail</label> <br>
        <input type="email" id="em" name="em" v-model="email" required>
      </div>
      
      <div>
        <label for="pass">Inserire la propria password</label> <br>
        <input type="password"  id="pass" name="pass" v-model="password" required>
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

