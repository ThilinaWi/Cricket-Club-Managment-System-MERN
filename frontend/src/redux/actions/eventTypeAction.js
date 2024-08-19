import axios from 'axios';
import { toast } from 'react-toastify';
import {
    CREATE_EVENT_TYPE_FAIL,
    CREATE_EVENT_TYPE_REQUEST,
    CREATE_EVENT_TYPE_SUCCESS,
    EVENT_TYPE_LOAD_FAIL,
    EVENT_TYPE_LOAD_REQUEST,
    EVENT_TYPE_LOAD_SUCCESS,
    DELETE_EVENT_TYPE_REQUEST,
    DELETE_EVENT_TYPE_FAIL,
    DELETE_EVENT_TYPE_SUCCESS
} from '../constant/eventTypeConstant';


// load events type
export const eventTypeLoadAction = () => async (dispatch) => {
    dispatch({ type: EVENT_TYPE_LOAD_REQUEST });
    try {
        const { data } = await axios.get('/api/type/events');
        dispatch({
            type: EVENT_TYPE_LOAD_SUCCESS,
            payload: data
        });
    } catch (error) {
        dispatch({
            type: EVENT_TYPE_LOAD_FAIL,
            payload: error.response.data.error
        });
    }
}


// create EVENTs category
export const createEventTypeAction = (eventtype) => async (dispatch) => {
    dispatch({ type: CREATE_EVENT_TYPE_REQUEST })

    try {
        const { data } = await axios.post("/api/type/create", eventtype)
        dispatch({
            type: CREATE_EVENT_TYPE_SUCCESS,
            payload: data
        })
        toast.success("event type created successfully");


    } catch (error) {
        dispatch({
            type: CREATE_EVENT_TYPE_FAIL,
            payload: error.response.data.error
        })
        toast.error(error.response.data.error);

    }
}


//delete single EVENT action
export const deleteSingleEventTypeAction = (type_id) => async (dispatch) => {
    dispatch({ type: DELETE_EVENT_TYPE_REQUEST });
    try {
        const { data } = await axios.delete(`/api/type/delete/${type_id}`);
        dispatch({
            type: DELETE_EVENT_TYPE_SUCCESS,
            payload: data
        });
        toast.success("Event type deleted successfully");
    } catch (error) {
        dispatch({
            type: DELETE_EVENT_TYPE_FAIL,
            payload: error.response.data.error
        });
        toast.error(error.response.data.error);
    }
}