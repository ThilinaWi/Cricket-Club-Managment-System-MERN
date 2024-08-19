import axios from 'axios';
import { toast } from 'react-toastify';
import { ALL_COACH_LOAD_FAIL, ALL_COACH_LOAD_REQUEST, ALL_COACH_LOAD_SUCCESS, COACH_CREATE_FAIL, COACH_CREATE_REQUEST, COACH_CREATE_SUCCESS, COACH_DELETE_FAIL, COACH_DELETE_REQUEST, COACH_DELETE_RESET, COACH_DELETE_SUCCESS, COACH_UPDATE_FAIL, COACH_UPDATE_REQUEST, COACH_UPDATE_SUCCESS, SINGLE_COACH_LOAD_FAIL, SINGLE_COACH_LOAD_REQUEST, SINGLE_COACH_LOAD_SUCCESS } from '../constant/coachConstant';



export const allCoachAction = () => async (dispatch) => {
    dispatch({ type: ALL_COACH_LOAD_REQUEST });
    try {
        const { data } = await axios.get(`http://localhost:9000/coach/`);
        dispatch({
            type: ALL_COACH_LOAD_SUCCESS,
            payload: data
        });

    } catch (error) {
        dispatch({
            type: ALL_COACH_LOAD_FAIL,
            payload: error.responsedata.error
        });
    }
}


//delete user action
export const deleteCoachAction = (_id) => async (dispatch) => {
    dispatch({ type: COACH_DELETE_REQUEST });
    try {
        const { data } = await axios.delete(`http://localhost:9000/coach/delete/${_id}`);
        dispatch({
            type: COACH_DELETE_SUCCESS,
            payload: data
        });
        toast.success("Coach deleted successfully");
    } catch (error) {
        dispatch({
            type: COACH_DELETE_FAIL,
            payload: error.response.data.error
        });
        toast.error(error.response.data.error);
    }
}  

//update User
export const coachUpdateAction = (coach) => async (dispatch) => {
    dispatch({ type: COACH_UPDATE_REQUEST });
    try {
        const { data } = await axios.put(`http://localhost:9000/coach/update/${coach._id}`, coach);
        dispatch({
            type: COACH_UPDATE_SUCCESS,
            payload: data
        });
        toast.success("Coach updated successfully");
    } catch (error) {
        dispatch({
            type: COACH_UPDATE_FAIL,
            payload: error.response.data.error
        });
        toast.error(error.response.data.error);
    }
}


//single user action
export const singleCoachAction = (id) => async (dispatch) => {
    dispatch({ type: SINGLE_COACH_LOAD_REQUEST });
    try {
        const { data } = await axios.get(`http://localhost:9000/coach/get/${id}`);
        dispatch({
            type: SINGLE_COACH_LOAD_SUCCESS,
            payload: data
        });

    } catch (error) {
        dispatch({
            type: SINGLE_COACH_LOAD_FAIL,
            payload: error.response.data.error
        });
    }
}


// user sign up
export const coachSignUpAction = (coach) => async (dispatch) => {
    dispatch({ type: COACH_CREATE_REQUEST });
    try {
        const { data } = await axios.post("http://localhost:9000/coach/add", coach);

        dispatch({
            type: COACH_CREATE_SUCCESS,
            payload: data
        });
        toast.success("Register Successfully!");
    } catch (error) {
        dispatch({
            type: COACH_CREATE_FAIL,
            payload: error.response.data.error
        });
        toast.error(error.response.data.error);
    }
}
