import {
    DELETE_EVENT_FAIL,
    DELETE_EVENT_REQUEST,
    DELETE_EVENT_RESET,
    DELETE_EVENT_SUCCESS,
    EDIT_EVENT_FAIL,
    EDIT_EVENT_REQUEST,
    EDIT_EVENT_RESET,
    EDIT_EVENT_SUCCESS,
    EVENT_LOAD_FAIL,
    EVENT_LOAD_REQUEST,
    EVENT_LOAD_RESET,
    EVENT_LOAD_SINGLE_FAIL,
    EVENT_LOAD_SINGLE_REQUEST,
    EVENT_LOAD_SINGLE_RESET,
    EVENT_LOAD_SINGLE_SUCCESS,
    EVENT_LOAD_SUCCESS,
    REGISTER_EVENT_FAIL,
    REGISTER_EVENT_REQUEST,
    REGISTER_EVENT_RESET,
    REGISTER_EVENT_SUCCESS
} from "../constant/eventconstant"


export const loadEventReducer = (state = { events: [] }, action) => {
    switch (action.type) {
        case EVENT_LOAD_REQUEST:
            return { loading: true }
        case EVENT_LOAD_SUCCESS:
            return {
                loading: false,
                success: action.payload.success,
                page: action.payload.page,
                pages: action.payload.pages,
                count: action.payload.count,
                setUniqueLocation: action.payload.setUniqueLocation,
                events: action.payload.events
            }
        case EVENT_LOAD_FAIL:
            return {
                loading: false,
                error: action.payload
            }
        case EVENT_LOAD_RESET:
            return {}
        default:
            return state;
    }
}

// single event reducer
export const loadEventSingleReducer = (state = { event: {} }, action) => {
    switch (action.type) {
        case EVENT_LOAD_SINGLE_REQUEST:
            return { loading: true }
        case EVENT_LOAD_SINGLE_SUCCESS:
            return {

                loading: false,
                success: action.payload.success,
                singleEvent: action.payload.event,

            }
        case EVENT_LOAD_SINGLE_FAIL:
            return { loading: false, error: action.payload }
        case EVENT_LOAD_SINGLE_RESET:
            return {}
        default:
            return state;
    }

}

//Registred event;
export const registerAeventReducer = (state = {}, action) => {
    switch (action.type) {
        case REGISTER_EVENT_REQUEST:
            return { loading: true }
        case REGISTER_EVENT_SUCCESS:
            return {
                loading: false,
                event: action.payload,
            }
        case REGISTER_EVENT_FAIL:
            return { loading: false, error: action.payload }
        case REGISTER_EVENT_RESET:
            return {}
        default:
            return state;
    }
}

// delete event by id
//delete product by id
export const deleteEventReducer = (state = {}, action) => {
    switch (action.type) {
        case DELETE_EVENT_REQUEST:
            return { loading: true }
        case DELETE_EVENT_SUCCESS:
            return {
                loading: false,
                success: action.payload.success,
                message: action.payload.message
            }
        case DELETE_EVENT_FAIL:
            return {
                loading: false,
                error: action.payload
            }
        case DELETE_EVENT_RESET:
            return {}
        default:
            return state;
    }
}


export const updateEventReducer = (state = {}, action) => {
    switch (action.type) {
        case EDIT_EVENT_REQUEST:
            return { loading: true }
        case EDIT_EVENT_SUCCESS:
            return {
                loading: false,
                success: action.payload.success,
                event: action.payload.event
            }
        case EDIT_EVENT_FAIL:
            return {
                loading: false,
                error: action.payload
            }
        case EDIT_EVENT_RESET:
            return {}
        default:
            return state;
    }
}
