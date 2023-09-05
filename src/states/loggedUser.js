// https://vuejs.org/guide/scaling-up/state-management.html#simple-state-management-with-reactivity-api

import { reactive } from 'vue'
import { status, clearStatus, setStatus } from './status';
const HOST = import.meta.env.VITE_API_HOST || `http://localhost:3000`
const LOGIN_URL = HOST+`/api/auth`
const DEL_URL = HOST+`/api/user`
const SIGNUP_URL = HOST+`/api/user/signUp`
const REMPREF_URL = HOST+`/api/user/remPref`
const ADDPREF_URL = HOST+`/api/user/addPref`

const loggedUser = reactive({
    token: undefined,
    _id: undefined,
    nome: undefined,
    cognome: undefined,
    username: undefined,
    email: undefined,
    password: undefined,
    emailChecked: undefined,
    opereProdotte: [],
    operePreferite: []
})

function setLoggedUser (data, extToken) {
    loggedUser.token = extToken;
    loggedUser._id = data._id;
    loggedUser.nome = data.nome;
    loggedUser.cognome = data.cognome;
    loggedUser.username = data.username;
    loggedUser.email = data.email;
    loggedUser.password = data.password;
    loggedUser.emailChecked = data.emailChecked;
    loggedUser.opereProdotte = data.opereProdotte,extToken;
    loggedUser.operePreferite = data.operePreferite,extToken;
}

function clearLoggedUser () {
    loggedUser.token = undefined;
    loggedUser._id = undefined;
    loggedUser.nome = undefined;
    loggedUser.cognome = undefined;
    loggedUser.username = undefined;
    loggedUser.email = undefined;
    loggedUser.password = undefined;
    loggedUser.emailChecked = undefined;
    loggedUser.opereProdotte = [];
    loggedUser.operePreferite = [];
}

async function logintry(em,pass){
    var response = await fetch(LOGIN_URL, {
        method: "POST", // *GET, POST, PUT, DELETE, etc.
        headers: {
          "Content-Type": "application/json",
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: JSON.stringify({email: em, password: pass}), // body data type must match "Content-Type" header
      });
    var unknownData = await response.json() // parses JSON response into native JavaScript objects
    if(unknownData.success == false){
        setStatus(unknownData)
        return false
    }
    else if(unknownData.success == true){
        clearStatus()
        setLoggedUser(unknownData.user,unknownData.token)
        return true
    }
}

async function signintry(us,em,ps,na,sn){
    var response = await fetch(SIGNUP_URL, {
        method: "POST", // *GET, POST, PUT, DELETE, etc.
        headers: {
          "Content-Type": "application/json",
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: JSON.stringify({
            username: us,
            email: em,
            password: ps,
            nome: na,
            cognome: sn
        }), // body data type must match "Content-Type" header
      });
    var unknownData = await response.json() // parses JSON response into native JavaScript objects
    if(unknownData.success == false){
        setStatus(unknownData)
        return false
    }
    else if(unknownData.success == true){
        clearStatus()
        window.alert("Richiesta ricevuta correttamente, guarda la tua casella email")
        return true
    }
}

async function deletetry(token){
    var response = await fetch(DEL_URL, {
        method: "DELETE", // *GET, POST, PUT, DELETE, etc.
        headers: {
          "Content-Type": "application/json",
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: JSON.stringify({
            token: token
        }), // body data type must match "Content-Type" header
      });
    var unknownData = await response.json()
    console.log(unknownData)
    if(unknownData.success == false){
        setStatus(unknownData)
        return false
    }
    else if(unknownData.success){
        return true
    }
}

async function add(opera,token){
    var response = await fetch(ADDPREF_URL, {
        method: "POST", // *GET, POST, PUT, DELETE, etc.
        headers: {
          "Content-Type": "application/json",
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: JSON.stringify({
            token: token,
            id: opera
        }), // body data type must match "Content-Type" header
      });
    var unknownData = await response.json()
    if(unknownData.success == false){
        setStatus(unknownData)
    }
    else if(unknownData.success){
        loggedUser.operePreferite.push(opera)
    }
}

async function remove(opera,token){
    var response = await fetch(REMPREF_URL, {
        method: "POST", // *GET, POST, PUT, DELETE, etc.
        headers: {
          "Content-Type": "application/json",
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: JSON.stringify({
            token: token,
            id: opera
        }), // body data type must match "Content-Type" header
      });
    var unknownData = await response.json()
    if(unknownData.success == false){
        setStatus(unknownData)
    }
    else if(unknownData.success){
        const index = loggedUser.operePreferite.indexOf(opera);
        if (index > -1) { // only splice array when item is found
            loggedUser.operePreferite.splice(index, 1); // 2nd parameter means remove one item only
        }
    }
}

export { loggedUser, setLoggedUser, clearLoggedUser, logintry, signintry, add, remove, deletetry } 