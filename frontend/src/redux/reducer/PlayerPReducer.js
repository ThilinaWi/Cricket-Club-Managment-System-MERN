import {  Performance_DELETE_FAIL, Performance_DELETE_REQUEST, Performance_DELETE_RESET, Performance_DELETE_SUCCESS, Performance_LOAD_FAIL, Performance_LOAD_REQUEST, Performance_LOAD_RESET, Performance_LOAD_SUCCESS, SPerformance_LOAD_FAIL,
     SPerformance_LOAD_REQUEST, SPerformance_LOAD_RESET, SPerformance_LOAD_SUCCESS } from "../constant/performPConstant"


export const loadPlayerPReducer = (state = {playerPs:[]} ,action)=>{
    switch (action.type){
        case Performance_LOAD_REQUEST:
            return {loading: true}
        case Performance_LOAD_SUCCESS:
            return {
                loading: false,
                success: action.payload.success,
                page: action.payload.page,
                pages: action.payload.pages,
                count: action.payload.count,
                setUniquePosition: action.payload.setUniquePosition,
                playerPs: action.payload.playerPs
            }
        case Performance_LOAD_FAIL:
            return {
                loading: false,
                error: action.payload
            }
         case Performance_LOAD_RESET:
            return {}
            
        default:
            return state;
    }
}



export const loadSinglePlayerPReducer = (state = { playerP: {} }, action) => {
    switch (action.type) {
        case SPerformance_LOAD_REQUEST:
            return { loading: true }
        case SPerformance_LOAD_SUCCESS:
            return {

                loading: false,
                success: action.payload.success,
                playerP: action.payload.playerP,

            }
        case SPerformance_LOAD_FAIL:
            return { loading: false, error: action.payload }
        case SPerformance_LOAD_RESET:
            return {}
        default:
            return state;
    }
}



    export const deletePlayerPReducer = (state = { }, action) => {
        switch (action.type) {
            case Performance_DELETE_REQUEST:
                return { loading: true }
            case Performance_DELETE_SUCCESS:
                return {
    
                    loading: false,
                    success: action.payload.success,
    
                }
            case Performance_DELETE_FAIL:
                return { loading: false, error: action.payload }
            case Performance_DELETE_RESET:
                return {}
            default:
                return state;
        }
    

    }


   
