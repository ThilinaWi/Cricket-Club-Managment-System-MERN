import axios from 'axios'
import { PSESSION_LOAD_FAIL, PSESSION_TYPE_LOAD_FAIL, PSESSION_TYPE_LOAD_REQUEST, PSESSION_TYPE_LOAD_SUCCESS } from "../constant/pSessionConstant"

export const pSessionTypeLoadAction = ()=>async(dispatch) => {

    dispatch({ type:PSESSION_TYPE_LOAD_REQUEST })
    try{
        const { data } = await axios.get(`http://localhost:9000/api/psessionType/alljobtype`)
        dispatch({ 
            type:PSESSION_TYPE_LOAD_SUCCESS, 
            payload:data

        });
    }catch(error){
        dispatch({ 
            type:PSESSION_TYPE_LOAD_FAIL, 
            payload:error.response.data.error

        });

    }
}