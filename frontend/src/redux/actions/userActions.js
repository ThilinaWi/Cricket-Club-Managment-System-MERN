import axios from 'axios';
import { toast } from 'react-toastify';
import { ALL_USER_LOAD_FAIL, ALL_USER_LOAD_REQUEST, ALL_USER_LOAD_SUCCESS, SINGLE_USER_LOAD_FAIL, SINGLE_USER_LOAD_REQUEST, SINGLE_USER_LOAD_SUCCESS, USER_DELETE_FAIL, USER_DELETE_REQUEST, USER_DELETE_SUCCESS, USER_LOAD_FAIL, USER_LOAD_REQUEST, USER_LOAD_SUCCESS, USER_LOGOUT_FAIL, USER_LOGOUT_REQUEST, USER_LOGOUT_SUCCESS, USER_SIGNIN_FAIL, USER_SIGNIN_REQUEST, USER_SIGNIN_SUCCESS, USER_SIGNUP_FAIL, USER_SIGNUP_REQUEST, USER_SIGNUP_SUCCESS, USER_UPDATE_FAIL, USER_UPDATE_REQUEST, USER_UPDATE_SUCCESS, USER_APPLY_EVENT_FAIL,
    USER_APPLY_EVENT_REQUEST,
    USER_APPLY_EVENT_SUCCESS, } from "../constant/userConstant"

export const userSignInAction = (user)=>async(dispatch) => {

    dispatch({ type:USER_SIGNIN_REQUEST })
    try{
        const { data } = await axios.post("/api/signin",user);
        localStorage.setItem('userInfo',JSON.stringify(data))
        dispatch({ 
            type:USER_SIGNIN_SUCCESS, 
            payload:data
        });
        toast.success("Login Successfull!");
    }catch(error){
        dispatch({ 
            type:USER_SIGNIN_FAIL, 
            payload:error.response.data.error

        });
        toast.error("Invalid email or Password!");

    }
}

//user logout

export const userLogoutAction = () => async (dispatch) => {
    dispatch({ type: USER_LOGOUT_REQUEST });
    try {
        localStorage.removeItem('userInfo');
        const { data } = await axios.get("http://localhost:9000/api/logout");
        localStorage.removeItem('userInfo');
        dispatch({
            type: USER_LOGOUT_SUCCESS,
            payload: data
        });
        toast.success("Log out successfully!");
    } catch (error) {
        dispatch({
            type: USER_LOGOUT_FAIL,
            payload: error.response.data.error
        });
        toast.error(error.response.data.error);
    }
}


// user sign up
export const userSignUpAction = (user) => async (dispatch) => {
    dispatch({ type: USER_SIGNUP_REQUEST });
    try {
        const { data } = await axios.post("http://localhost:9000/api/signup", user);

        dispatch({
            type: USER_SIGNUP_SUCCESS,
            payload: data
        });
        toast.success("Register Successfully!");
    } catch (error) {
        dispatch({
            type: USER_SIGNUP_FAIL,
            payload: error.response.data.error
        });
        toast.error(error.response.data.error);
    }
}

//all user action
export const allUserAction = (pageNumber, keyword = '', bowlingStyle = '', battingStyle = '') => async (dispatch) => {
    dispatch({ type: ALL_USER_LOAD_REQUEST });
    try {
        const { data } = await axios.get(`/api/allusers/?pageNumber=${pageNumber}&keyword=${keyword}&bowlingStyle=${bowlingStyle}&battingStyle=${battingStyle}`);
        dispatch({
            type: ALL_USER_LOAD_SUCCESS,
            payload: data
        });

    } catch (error) {
        dispatch({
            type: ALL_USER_LOAD_FAIL,
            payload: error.response.data.error
        });
    }
}

//delete user action
export const deleteUserAction = (user_id) => async (dispatch) => {
    dispatch({ type: USER_DELETE_REQUEST });
    try {
        const { data } = await axios.delete(`http://localhost:9000/api/admin/user/delete/${user_id}`);
        dispatch({
            type: USER_DELETE_SUCCESS,
            payload: data
        });
        toast.success("User deleted successfully");
    } catch (error) {
        dispatch({
            type: USER_DELETE_FAIL,
            payload: error.response.data.error
        });
        toast.error(error.response.data.error);
    }
}  

// user profile action
export const userProfileAction = () => async (dispatch) => {
    dispatch({ type: USER_LOAD_REQUEST });
    try {
        const { data } = await axios.get("/api/me");
        dispatch({
            type: USER_LOAD_SUCCESS,
            payload: data
        });

    } catch (error) {
        dispatch({
            type: USER_LOAD_FAIL,
            payload: error.response.data.error
        });
    }
}

//update User
export const userUpdateAction = (user) => async (dispatch) => {
    dispatch({ type: USER_UPDATE_REQUEST });
    try {
        const { data } = await axios.put(`/api/user/edit/${user._id}`, user);
        dispatch({
            type: USER_UPDATE_SUCCESS,
            payload: data
        });
        toast.success("User updated successfully");
    } catch (error) {
        dispatch({
            type: USER_UPDATE_FAIL,
            payload: error.response.data.error
        });
        toast.error(error.response.data.error);
    }
}

//single user action
export const singleUserAction = (id) => async (dispatch) => {
    dispatch({ type: SINGLE_USER_LOAD_REQUEST });
    try {
        const { data } = await axios.get(`/api/user/${id}`);
        dispatch({
            type: SINGLE_USER_LOAD_SUCCESS,
            payload: data
        });

    } catch (error) {
        dispatch({
            type: SINGLE_USER_LOAD_FAIL,
            payload: error.response.data.error
        });
    }
}

//user EVENT apply action
export const userApplyEventAction = (event) => async (dispatch) => {
    dispatch({ type: USER_APPLY_EVENT_REQUEST });
    try {
        const { data } = await axios.post("/api/user/eventhistory", event);

        dispatch({
            type: USER_APPLY_EVENT_SUCCESS,
            payload: data
        });
        toast.success("i will participate");
    } catch (error) {
        dispatch({
            type: USER_APPLY_EVENT_FAIL,
            payload: error.response.data.error
        });
        toast.error(error.response.data.error);
    }
}