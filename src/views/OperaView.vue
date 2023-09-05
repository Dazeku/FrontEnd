<script setup>
import { onMounted, ref } from 'vue';
import { RouterLink, useRoute } from 'vue-router';
import { status } from '../states/status.js'
import { loggedUser, add, remove } from '../states/loggedUser'
import { opera, nCap, nGen, getOperaById} from '../states/opere';

const op = useRoute().params.op

const ready = ref(false)

onMounted( () =>{
    getOperaById(op,loggedUser.token).then( (ris) => {
        if(ris){
            ready.value = true
        }
    })
})
</script>

<template>
    <div v-if="ready" style="display: grid; grid-template-columns: 65vw 20vw">
        <div>
            <div class="title"> {{ opera.titolo }}</div>
            <div style="margin-top: 20px; margin-right: 10vw;"> 
                Disponibili {{ nCap }} capitoli <br>
                <div v-if="nCap!=0" v-for="i in opera.listaCap">
                    <RouterLink :to="`/chapter/${i._id}`" style="margin-left: 10vw;">
                        <div class="buttonlike" style="display: grid; grid-template-columns: 5vw 40vw; text-align: center; padding-top: 5px; padding-bottom: 5px;">
                            <div> {{ i.numero }} </div>
                            <div> {{ i.titolo }} </div>
                        </div>
                    </RouterLink>
                </div>
                <div v-else>Mi dispiace, ma non ci sono capitoli disponibili</div>
            </div>
        </div>
        <div style="margin-top: 60px;">
            <div> 
                Da: <RouterLink :to="`/profile/${opera.autoreId}`" class="buttonlike" style="padding: 3px 10px; margin-left: 10px;">
                     {{ opera.autore }} 
                    </RouterLink>
            </div>
            <div style="margin-top: 15px;">
                Generi:<br>
                <div v-if="nGen!=0"> {{ opera.generi }} </div>
                <div v-else>L'autore non ha inserito nessun genere per quest'opera</div>
            </div>
            <div v-if="loggedUser._id != undefined" style="margin-top: 10px; margin-left: 100px">
                <div v-if="loggedUser.operePreferite.includes(op)">
                    <button @click="remove(op,loggedUser.token)" >Smetti di seguire</button>
                </div>
                <div v-else> <button @click="add(op,loggedUser.token)" > Segui</button></div>
            </div>
            <div style="margin-top: 15px;">
                <span style="font-weight: bold;">Sinossi:</span><br>
                <span style="font-style: italic;">{{ opera.sinossi }}</span>
            </div>
            <div style="margin-top: 25px;">
                Seguito da: {{ opera.nSeguaci }}
            </div>
        </div>
    </div>
    <span style="color: red" v-if="status.success != undefined"> 
      <br> {{ status.message }} 
    </span>
    <span v-if="!ready">
      <br> Aspettare caricamento dati...
    </span>
</template>