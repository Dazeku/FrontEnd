import { reactive, ref } from 'vue'
import { clearStatus, setStatus } from './status';
import { profilePreview, risRicerca } from './risRicerca';
import { loggedUser } from './loggedUser';

const HOST = import.meta.env.VITE_API_HOST || `http://localhost:3000`
const API_URL = HOST+`/api/user`

const nProd = ref(0)
const nPref = ref(0)

const profile = reactive({
    nome: undefined,
    cognome: undefined,
    username: undefined,
    email: undefined,
    opereProdotte: [],
    operePreferite: []
})

//const profile = reactive(profilePreview)

function setProfile (data) {
    profile.nome = data.nome;
    profile.cognome = data.cognome;
    profile.username = data.username;
    profile.email = data.email;
    profile.opereProdotte = data.opereProdotte;
    nProd.value = profile.opereProdotte.length
    profile.operePreferite = data.operePreferite;
    nPref.value = profile.operePreferite.length
}

function clearProfile () {
    profile.nome = undefined;
    profile.cognome = undefined;
    profile.username = undefined;
    profile.email = undefined;
    profile.opereProdotte = [];
    profile.operePreferite = [];
    nPref.value = 0
    nProd.value = 0
}

async function getProfileById(id,token){
    let URL = "/?id="+id+"&token="+token; 
    let unknownData = await (await fetch(API_URL+URL)).json();
    if(unknownData.success == false){
        setStatus(unknownData)
        return false
    }
    else if(unknownData.success == true){
        clearStatus()
        setProfile(unknownData.data);
        return true
    }
}

async function modificaProfile(user,nome,cogn,pass,conf,token){
    let obj = {}
    if(pass != ""){
        if(pass != conf){ 
            setStatus({
                success: false,
                message: "Le due password non coincidono"
            })
            return false
        }
        if(pass.length < 8){ 
            setStatus({
                success: false,
                message: "La password deve avere almeno 8 caratteri"
            })
            return false
        }
        if(!(/[A-Z]/.test(pass) && /[a-z]/.test(pass) && /\d/.test(pass))){ 
            setStatus({
                success: false,
                message: "La password deve contenere una minuscola, una maiuscola e un numero"
            })
            return false
        } 
        obj.password = pass 
    }
    if(user != ""){ obj.username = user }
    if(nome != ""){ obj.nome = nome }
    if(cogn != ""){ obj.cognome = cogn }
    obj.token = token
 
    let unknownData = await (await fetch(API_URL,{
        method: "PATCH", // *GET, POST, PUT, DELETE, etc.
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(obj), // body data type must match "Content-Type" header
    })).json();
    if(unknownData.success == false){
        setStatus(unknownData)
        return false
    }
    else if(unknownData.success == true){
        setStatus(unknownData)
        if(pass!=""){ loggedUser.password = pass }
        if(user != ""){ loggedUser.username = user }
        if(nome != ""){ loggedUser.nome = nome }
        if(cogn != ""){ loggedUser.cognome = cogn }
        return true
    }
}


export { profile, nProd, nPref, getProfileById, modificaProfile }