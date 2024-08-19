import { PSESSION_TYPE_LOAD_FAIL, PSESSION_TYPE_LOAD_REQUEST, PSESSION_TYPE_LOAD_RESET, PSESSION_TYPE_LOAD_SUCCESS } from "../constant/pSessionConstant"

export const loadPracticeSessionTypeReducer = (state={sessionType:[]}, action)=>{
    switch(action.type){
        case PSESSION_TYPE_LOAD_REQUEST:
            return {loading:true}

        case PSESSION_TYPE_LOAD_SUCCESS:
            return {
                loading: false,
                sessionType :action.payload.sessionT //backend controller name
            }
        case PSESSION_TYPE_LOAD_FAIL:
            return {
                   loading: false,
                   error: action.payload,
            
            }

        case PSESSION_TYPE_LOAD_RESET:
            return {}
        
        default:
            return state;
    }

}