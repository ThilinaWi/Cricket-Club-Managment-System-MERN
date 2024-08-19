import { ALL_COACH_LOAD_FAIL, ALL_COACH_LOAD_REQUEST, ALL_COACH_LOAD_RESET, ALL_COACH_LOAD_SUCCESS, COACH_CREATE_FAIL, COACH_CREATE_REQUEST, COACH_CREATE_RESET, COACH_CREATE_SUCCESS, COACH_DELETE_FAIL, COACH_DELETE_REQUEST, COACH_DELETE_RESET, COACH_DELETE_SUCCESS, COACH_UPDATE_FAIL, COACH_UPDATE_REQUEST, COACH_UPDATE_RESET, COACH_UPDATE_SUCCESS, SINGLE_COACH_LOAD_FAIL, SINGLE_COACH_LOAD_REQUEST, SINGLE_COACH_LOAD_RESET, SINGLE_COACH_LOAD_SUCCESS } from "../constant/coachConstant"



//all coaches reducer
export const allCoachReducer = (state = { coaches: {} }, action) => {
    switch (action.type) {
        case ALL_COACH_LOAD_REQUEST:
            return { loading: true, coaches: [] }
        case ALL_COACH_LOAD_SUCCESS:
            return {
                loading: false,
                success: action.payload.success,
                coaches: action.payload.coaches,
                // page: action.payload.page,
                // pages: action.payload.pages,
                // count: action.payload.count,
                // uniqueBattingStyle: action.payload.uniqueBattingStyle,
                // uniqueBowlingStyle: action.payload.uniqueBowlingStyle,
            }
        case ALL_COACH_LOAD_FAIL:
            return { loading: false, coaches: [], error: action.payload }
        case ALL_COACH_LOAD_RESET:
            return {}
        default:
            return state;
    }

}

//delete coach reducer
export const coachDeleteReducer = (state = {}, action) => {
    switch (action.type) {
        case COACH_DELETE_REQUEST:
            return { loading: true }
        case COACH_DELETE_SUCCESS:
            return {
                loading: false,
                coachDelete: action.payload,
            }
        case COACH_DELETE_FAIL:
            return { loading: false, error: action.payload }
        case COACH_DELETE_RESET:
            return {}
        default:
            return state;
    }

}

//update COACH
export const coachUpdateReducer = (state = {}, action) => {
    switch (action.type) {
        case COACH_UPDATE_REQUEST:
            return { loading: true }
        case COACH_UPDATE_SUCCESS:
            return {
                loading: false,
                success:action.payload.success,
                coach: action.payload
            }
        case COACH_UPDATE_FAIL:
            return { loading: false, error: action.payload }
        case COACH_UPDATE_RESET:
            return {}
        default:
            return state;
    }
}


// single COACH reducer
export const singleCoachReducer = (state = { coach: {} }, action) => {
    switch (action.type) {
        case SINGLE_COACH_LOAD_REQUEST:
            return { loading: true, coach: null }
        case SINGLE_COACH_LOAD_SUCCESS:
            return {
                loading: false,
                coach: action.payload.coach,
            }
        case SINGLE_COACH_LOAD_FAIL:
            return { loading: false, coach: null, error: action.payload }
        case SINGLE_COACH_LOAD_RESET:
            return {}
        default:
            return state;
    }

}

//sign up 
export const CoachReducerSignUp = (state = {}, action) => {
    switch (action.type) {
        case COACH_CREATE_REQUEST:
            return { loading: true }
        case COACH_CREATE_SUCCESS:
            return {
                loading: false,
                userSignUp: action.payload,
            }
        case COACH_CREATE_FAIL:
            return { loading: false, error: action.payload }
        case COACH_CREATE_RESET:
            return {}
        default:
            return state;
    }
}