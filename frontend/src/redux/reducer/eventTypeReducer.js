import {
    CREATE_EVENT_TYPE_FAIL,
    CREATE_EVENT_TYPE_REQUEST,
    CREATE_EVENT_TYPE_RESET,
    CREATE_EVENT_TYPE_SUCCESS,
    EVENT_TYPE_LOAD_FAIL,
    EVENT_TYPE_LOAD_REQUEST,
    EVENT_TYPE_LOAD_RESET,
    EVENT_TYPE_LOAD_SUCCESS,
    DELETE_EVENT_TYPE_REQUEST,
    DELETE_EVENT_TYPE_SUCCESS,
    DELETE_EVENT_TYPE_FAIL,
    DELETE_EVENT_TYPE_RESET
} from "../constant/eventTypeConstant"

// load event type reducer
export const loadEventTypeReducer = (state = { eventType: [] }, action) => {
    switch (action.type) {
        case EVENT_TYPE_LOAD_REQUEST:
            return { loading: true }
        case EVENT_TYPE_LOAD_SUCCESS:
            return {
                loading: false,
                eventType: action.payload.eventT
            }
        case EVENT_TYPE_LOAD_FAIL:
            return {
                loading: false,
                error: action.payload
            }
        case EVENT_TYPE_LOAD_RESET:
            return {}
        default:
            return state;
    }
}

// create event type reducer
export const createEventTypeReducer = (state = {}, action) => {
    switch (action.type) {
        case CREATE_EVENT_TYPE_REQUEST:
            return { loading: true }
        case CREATE_EVENT_TYPE_SUCCESS:
            return {
                loading: false,
                eventType: action.payload,
            }
        case CREATE_EVENT_TYPE_FAIL:
            return { loading: false, error: action.payload }
        case CREATE_EVENT_TYPE_RESET:
            return {}
        default:
            return state;
    }

}
//delete product by id
export const deleteEventTypeReducer = (state = {}, action) => {
    switch (action.type) {
        case DELETE_EVENT_TYPE_REQUEST:
            return { loading: true }
        case DELETE_EVENT_TYPE_SUCCESS:
            return {
                loading: false,
                success: action.payload.success,
                message: action.payload.message
            }
        case DELETE_EVENT_TYPE_FAIL:
            return {
                loading: false,
                error: action.payload
            }
        case DELETE_EVENT_TYPE_RESET:
            return {}
        default:
            return state;
    }
}