import axios from 'axios';
import { toast } from 'react-toastify'
import {
    DELETE_EVENT_FAIL,
    DELETE_EVENT_REQUEST,
    DELETE_EVENT_SUCCESS,
    EDIT_EVENT_FAIL,
    EDIT_EVENT_REQUEST,
    EDIT_EVENT_SUCCESS,
    EVENT_LOAD_FAIL,
    EVENT_LOAD_REQUEST,
    EVENT_LOAD_SINGLE_FAIL,
    EVENT_LOAD_SINGLE_REQUEST,
    EVENT_LOAD_SINGLE_SUCCESS,
    EVENT_LOAD_SUCCESS,
    REGISTER_EVENT_FAIL,
    REGISTER_EVENT_REQUEST,
    REGISTER_EVENT_SUCCESS
} from "../constant/eventconstant"


export const eventLoadAction = (pageNumber, keyword = '', cat = '', location = '') => async (dispatch) => {
    dispatch({ type: EVENT_LOAD_REQUEST });
    try {
        const { data } = await axios.get(`/api/events/show/?pageNumber=${pageNumber}&keyword=${keyword}&cat=${cat}&location=${location}`)
        dispatch({
            type: EVENT_LOAD_SUCCESS,
            payload: data
        });
    } catch (error) {
        dispatch({
            type: EVENT_LOAD_FAIL,
            payload: error.response.data.error
        });
    }
}

// single EVENT action
export const eventLoadSingleAction = (id) => async (dispatch) => {
    dispatch({ type: EVENT_LOAD_SINGLE_REQUEST });
    try {
        const { data } = await axios.get(`/api/event/${id}`);
        dispatch({
            type: EVENT_LOAD_SINGLE_SUCCESS,
            payload: data
        });
    } catch (error) {
        dispatch({
            type: EVENT_LOAD_SINGLE_FAIL,
            payload: error.response.data.error
        });
    }
}


//delete single EVENT action
export const deleteSingleEventAction = (event_id) => async (dispatch) => {
    dispatch({ type: DELETE_EVENT_REQUEST });
    try {
        const { data } = await axios.delete(`/api/event/delete/${event_id}`);
        dispatch({
            type: DELETE_EVENT_SUCCESS,
            payload: data
        });
        toast.success("Event deleted successfully");
    } catch (error) {
        dispatch({
            type: DELETE_EVENT_FAIL,
            payload: error.response.data.error
        });
        toast.error(error.response.data.error);
    }
}


//edit single EVENT action
export const editSingleEventAction = (event) => async (dispatch) => {
    dispatch({ type: EDIT_EVENT_REQUEST });
    try {
        const { data } = await axios.put(`/api/event/update/${event._id}`, event);
        dispatch({
            type: EDIT_EVENT_SUCCESS,
            payload: data
        });
        toast.success("EVENT updated successfully");
    } catch (error) {
        dispatch({
            type: EDIT_EVENT_FAIL,
            payload: error.response.data.error
        });
        toast.error(error.response.data.error);
    }
}

// register EVENT action
export const registerAeventAction = (event) => async (dispatch) => {
    dispatch({ type: REGISTER_EVENT_REQUEST })

    try {
        const { data } = await axios.post("/api/event/create", event)
        dispatch({
            type: REGISTER_EVENT_SUCCESS,
            payload: data
        })
        toast.success("Event created successfully");

    } catch (error) {
        dispatch({
            type: REGISTER_EVENT_FAIL,
            payload: error.response.data.error
        })
        toast.error(error.response.data.error);
    }
}