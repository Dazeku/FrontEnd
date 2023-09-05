import { reactive, ref } from 'vue'
import { setStatus, clearStatus} from './status.js'

const HOST = import.meta.env.VITE_API_HOST || `http://localhost:3000`
const API_URL = HOST+`/api/opera`
const GENERAL_URL = API_URL+'/?'

const opera = reactive({
    __v: undefined,
    _id: undefined,
    autore: undefined,
    autoreId: undefined,
    generi: [],
    listaCap: [],
    nSeguaci: undefined,
    sinossi: undefined,
    titolo: undefined,
    visibile: undefined
})

const nCap = ref(0);
const nGen = ref(0);

class operaPreview{
    constructor(data){
        this._id = data._id;
        this.autore = data.autore;
        this.titolo = data.titolo;
        this.nSeguaci = data.nSeguaci;
        this.generi = data.generi;
    }
}

async function fillOpera(data,token){
    let URL
    let ris = []
    for(let i in data){
        URL = "id="+data[i]+"&token="+token;
        let unknownData = await (await fetch(GENERAL_URL+URL)).json();
        let el = new operaPreview(unknownData.data)
        ris.push(el)
    }
    return ris
}

function giveOpera(){
    return new operaPreview(opera)
}

function setOpera(data){
    opera.__v = data.__v;
    opera._id = data._id;
    opera.autore = data.autore;
    opera.autoreId = data.autoreId;
    opera.generi = data.generi;
    opera.listaCap = data.listaCap;
    opera.nSeguaci = data.nSeguaci;
    opera.sinossi = data.sinossi;
    opera.titolo = data.titolo;
    opera.visibile = data.visibile;
    nCap.value = opera.listaCap.length;
    nGen.value = opera.generi.length;
}

function clearOpera(){
    opera.__v = undefined;
    opera._id = undefined;
    opera.autore = undefined;
    opera.autoreId = undefined;
    opera.generi = [];
    opera.listaCap = [];
    opera.nSeguaci = undefined;
    opera.sinossi = undefined;
    opera.titolo = undefined;
    opera.visibile = undefined;
    nCap.value = 0;
    nGen.value = 0;
}

async function getOperaById(id,token){
    let URL = "id="+id+"&token="+token; 
    let unknownData = await (await fetch(GENERAL_URL+URL)).json();
    if(unknownData.success == false){
        setStatus(unknownData)
        return false
    }
    else if(unknownData.success == true){
        clearStatus()
        setOpera(unknownData.data);
        return true
    }
}

async function creaOpera(data){
    var response = await fetch(API_URL, {
        method: "POST", // *GET, POST, PUT, DELETE, etc.
        headers: {
          "Content-Type": "application/json",
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: JSON.stringify(data), // body data type must match "Content-Type" header
      });
    var unknownData = await response.json()
    console.log(unknownData)
    if(unknownData.success == false){
        setStatus(unknownData)
        return false
    }
    else if(unknownData.success){
        return unknownData.id
    }
}

async function deleteOpera(data){
    var response = await fetch(API_URL, {
        method: "DELETE", // *GET, POST, PUT, DELETE, etc.
        headers: {
          "Content-Type": "application/json",
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: JSON.stringify(data), // body data type must match "Content-Type" header
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

async function modifyOpera(data){
    var response = await fetch(API_URL, {
        method: "PATCH", // *GET, POST, PUT, DELETE, etc.
        headers: {
          "Content-Type": "application/json",
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: JSON.stringify(data), // body data type must match "Content-Type" header
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


export {opera, nCap, nGen, setOpera, operaPreview, getOperaById, fillOpera, giveOpera, creaOpera, deleteOpera, modifyOpera}