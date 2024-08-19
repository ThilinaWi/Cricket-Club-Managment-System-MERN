import { DELETE_PSESSION_FAIL, DELETE_PSESSION_REQUEST, DELETE_PSESSION_RESET, DELETE_PSESSION_SUCCESS, PSESSION_LOAD_FAIL, PSESSION_LOAD_REQUEST, PSESSION_LOAD_RESET, PSESSION_LOAD_SUCCESS,PSESSION_SINGLE_LOAD_FAIL,PSESSION_SINGLE_LOAD_REQUEST, PSESSION_SINGLE_LOAD_RESET, PSESSION_SINGLE_LOAD_SUCCESS, REGISTER_PSESSION_FAIL, REGISTER_PSESSION_REQUEST, REGISTER_PSESSION_RESET, REGISTER_PSESSION_SUCCESS, UPDATE_PSESSION_FAIL, UPDATE_PSESSION_REQUEST, UPDATE_PSESSION_RESET, UPDATE_PSESSION_SUCCESS } from "../constant/pSessionConstant"
//load psessions
export const loadPracticeSessionReducer = (state={sessions:[]}, action)=>{
    switch(action.type){
        case PSESSION_LOAD_REQUEST:
            return {loading:true}

        case PSESSION_LOAD_SUCCESS:
            return {
                loading: false,
                success: action.payload.success, 
                page: action.payload.page,
                pages: action.payload.pages,
                count: action.payload.count,
                sessions:action.payload.sessions //backend contoller names
            }
        case PSESSION_LOAD_FAIL:
            return {
                   loading: false,
                   error: action.payload,
            
            }

        case PSESSION_LOAD_RESET:
            return {}
        
        default:
            return state;
    }

}

//load single psessions

export const loadSinglePsessionReducer = (state = {session:[]}, action) => {
    switch(action.type){
        case PSESSION_SINGLE_LOAD_REQUEST:
            return {loading:true}
        case PSESSION_SINGLE_LOAD_SUCCESS:
            return {
                loading:false,
                success:action.payload.success,
                session:action.payload.session //backend controller
        }
        case PSESSION_SINGLE_LOAD_FAIL:
            return {loading:false,error:action.payload}
        case PSESSION_SINGLE_LOAD_RESET:
            return {}
        default:
            return state;
    }
}

//Create psession

export const registerPsessionReducer = (state = {}, action) => {
    switch (action.type) {
        case REGISTER_PSESSION_REQUEST:
            return { loading: true }
        case REGISTER_PSESSION_SUCCESS:
            return {
                loading: false,
                job: action.payload,
            }
        case REGISTER_PSESSION_FAIL:
            return { loading: false, error: action.payload }
        case REGISTER_PSESSION_RESET:
            return {}
        default:
            return state;
    }
}

//Delete psession

export const deletePsessionReducer = (state = {}, action) => {
    switch (action.type) {
        case DELETE_PSESSION_REQUEST:
            return { loading: true }
        case DELETE_PSESSION_SUCCESS:
            return {
                loading: false,
                success: action.payload.success,
                message: action.payload.message
            }
        case DELETE_PSESSION_FAIL:
            return {
                loading: false,
                error: action.payload
            }
        case DELETE_PSESSION_RESET:
            return {}
        default:
            return state;
    }
}

//Edit psessions

export const updatePsessionReducer = (state = {}, action) => {
    switch (action.type) {
        case UPDATE_PSESSION_REQUEST:
            return { loading: true }
        case UPDATE_PSESSION_SUCCESS:
            return {
                loading: false,
                success: action.payload.success,
                session:action.payload.session
            }
        case UPDATE_PSESSION_FAIL:
            return {
                loading: false,
                error: action.payload
            }
        case UPDATE_PSESSION_RESET:
            return {}
        default:
            return state;
    }
}


