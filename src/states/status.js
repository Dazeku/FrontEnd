import { reactive } from 'vue'

const status = reactive({
    success: undefined,
    message: undefined
})

function setStatus(data){
    status.success = data.success;
    status.message = data.message;
}

function clearStatus(){
    status.success = undefined;
    status.message = undefined;
}

export {status, setStatus, clearStatus}