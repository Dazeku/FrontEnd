import { reactive } from 'vue'
import { setStatus, clearStatus} from './status.js'


const HOST = import.meta.env.VITE_API_HOST || `http://localhost:3000`
const API_URL = HOST+`/api/opera`
const POPULAR_URL = API_URL+'/getmostsuccessful'
const TITLE_URL = API_URL+`/getmany`

const carosello = reactive({
    success: undefined,
    data: []
})

function setCarosello(data){
    clearCarosello()
    carosello.success = data.success;
    let temp = data.data;
    //carosello.data = temp;
    /*for(let i in temp){
        let y = new operaPreview(temp[i]);
        carosello.data.push(y);
    }*/
    carosello.data = temp
    
}

function clearCarosello(){
    carosello.success = undefined;
    carosello.data = [];
}

async function getCarosello(){
    let unknownData = await (await fetch(POPULAR_URL)).json()
    if(unknownData.success){
        setCarosello(unknownData)
        clearStatus()
    }
    else{
        setStatus(unknownData)
    }
}

async function getTitle(str){
    let URL = "?titolo=" + str
    let unknownData = await (await fetch(TITLE_URL+URL)).json()
    if(unknownData.success){
        setCarosello(unknownData)
        clearStatus()
    }
    else{
        setStatus(unknownData)
    }
}



export {carosello, setCarosello, clearCarosello, getCarosello, getTitle}