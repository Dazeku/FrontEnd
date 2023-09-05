import { reactive } from "vue";
import { setStatus, clearStatus } from "./status";

const HOST = import.meta.env.VITE_API_HOST || `http://localhost:3000`
const API_URL = HOST+`/api/capitolo`

const capitolo = reactive({
    _id: undefined,
    titolo: undefined,
    operaId: undefined,
    numero: undefined, 
    testo: undefined,
    visibile: undefined,
    __v: undefined
})

function setCapitolo(data){
    capitolo._id = data._id,
    capitolo.titolo = data.titolo,
    capitolo.operaId = data.operaId,
    capitolo.numero = data.numero, 
    capitolo.testo = data.testo,
    capitolo.visibile = data.visibile,
    capitolo.__v = data.__v
}

function clearCapitolo(){
    capitolo._id = undefined,
    capitolo.titolo = undefined,
    capitolo.operaId = undefined,
    capitolo.numero = undefined, 
    capitolo.testo = undefined,
    capitolo.visibile = undefined,
    capitolo.__v = undefined
}

async function getCapitolo(id,token){
    let URL = "?id="+id+"&token="+token; 
    let unknownData = await (await fetch(API_URL+URL)).json();
    if(unknownData.success == false){
        setStatus(unknownData)
        return CSSFontFeatureValuesRule
    }
    else if(unknownData.success == true){
        clearStatus()
        setCapitolo(unknownData.data);
        return true
    }
}
async function modifyCapitolo(data){
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
async function creaCapitolo(data){
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
        return true //// GUARDA DI CAMBIARLO DOPO
    }
}
async function deleteCapitolo(data){
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

export { capitolo, setCapitolo, getCapitolo, modifyCapitolo, creaCapitolo, deleteCapitolo }