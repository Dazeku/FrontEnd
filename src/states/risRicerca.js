import { reactive } from 'vue'
import { clearStatus, setStatus } from './status';

const HOST = import.meta.env.VITE_API_HOST || `http://localhost:3000`
const API_URL = HOST+`/api/user/getmany`

class profilePreview{
    constructor(data){
        this._id = data._id;
        this.nome = data.nome;
        this.cognome = data.cognome;
        this.username = data.username;
    }
}

/*class profilePreview{
    constructor(){
        this._id = undefined;
        this.nome = undefined;
        this.cognome = undefined;
        this.username = undefined;
        this.email = undefined;
        this.opereProdotte = [];
        this.operePreferite = []
    }
}*/

const risRicerca = reactive({
    success: undefined,
    data: []
})

function setRisRicerca(data){
    clearRisRicerca()
    risRicerca.success = data.success;
    let temp = data.data;
    //carosello.data = temp;
    /*for(let i in temp){
        let y = new operaPreview(temp[i]);
        carosello.data.push(y);
    }*/
    risRicerca.data = temp
    
}

function clearRisRicerca(){
    risRicerca.success = undefined;
    risRicerca.data = [];
}

async function getProfile(str){
    let URL = "?username=" + str
    let unknownData = await (await fetch(API_URL+URL)).json()
    if(unknownData.success){
        setRisRicerca(unknownData)
        clearStatus()
    }
    else{
        setStatus(unknownData)
    }
}

export {profilePreview, risRicerca, setRisRicerca, clearRisRicerca, getProfile}