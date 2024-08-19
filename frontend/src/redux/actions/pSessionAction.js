import axios from 'axios'
import { toast } from 'react-toastify';
import { DELETE_PSESSION_FAIL, DELETE_PSESSION_REQUEST, DELETE_PSESSION_SUCCESS, PSESSION_LOAD_FAIL, PSESSION_LOAD_REQUEST, PSESSION_LOAD_SUCCESS, PSESSION_SINGLE_LOAD_FAIL, PSESSION_SINGLE_LOAD_REQUEST, PSESSION_SINGLE_LOAD_SUCCESS, REGISTER_PSESSION_FAIL, REGISTER_PSESSION_REQUEST, REGISTER_PSESSION_SUCCESS, UPDATE_PSESSION_FAIL, UPDATE_PSESSION_REQUEST, UPDATE_PSESSION_SUCCESS } from "../constant/pSessionConstant"

export const pSessionLoadAction = (pageNumber,keyword='',startDate='',endDate='',cat='')=>async(dispatch) => {

    dispatch({ type:PSESSION_LOAD_REQUEST })
    try{
        const { data } = await axios.get(`http://localhost:9000/api/practicesessions/show?pageNumber=${pageNumber}&keyword=${keyword}&startDate=${startDate}&endDate=${endDate}&cat=${cat}`)
        dispatch({ 
            type:PSESSION_LOAD_SUCCESS, 
            payload:data

        });
    }catch(error){
        dispatch({ 
            type:PSESSION_LOAD_FAIL, 
            payload:error.response.data.error

        });

    }
}

//single psession load

export const singlepSessionLoadAction = (id)=>async(dispatch) => {

    dispatch({ type:PSESSION_SINGLE_LOAD_REQUEST })
    try{
        const { data } = await axios.get(`http://localhost:9000/api/practicesession/${id}`);
        dispatch({ 
            type:PSESSION_SINGLE_LOAD_SUCCESS, 
            payload:data

        });
    }catch(error){
        dispatch({ 
            type:PSESSION_SINGLE_LOAD_FAIL, 
            payload:error.response.data.error

        });

    }
}

//Create new PSession

export const registerApSessionAction = (praticeSession) => async (dispatch) => {
    dispatch({ type: REGISTER_PSESSION_REQUEST })

    try {
        const { data } = await axios.post("http://localhost:9000/api/practicesession/create", praticeSession)
        dispatch({
            type: REGISTER_PSESSION_SUCCESS,
            payload: data
        })
        toast.success("Job created successfully");

    } catch (error) {
        dispatch({
            type: REGISTER_PSESSION_FAIL,
            payload: error.response.data.error
        })
        toast.error(error.response.data.error);
    }
}

//Delete psession

export const deleteSinglePsessionAction = (session_id) => async (dispatch) => {
    dispatch({ type: DELETE_PSESSION_REQUEST });
    try {
        const { data } = await axios.delete(`http://localhost:9000/api/practicesessions/delete/${session_id}`);
        dispatch({
            type: DELETE_PSESSION_SUCCESS,
            payload: data
        });
        toast.success("Job deleted successfully");
    } catch (error) {
        dispatch({
            type: DELETE_PSESSION_FAIL,
            payload: error.response.data.error
        });
        toast.error(error.response.data.error);
    }
}

//update practice session

export const editSinglePsessionAction = (session) => async (dispatch) => {
    dispatch({ type: UPDATE_PSESSION_REQUEST });
    try {
        const { data } = await axios.put(`http://localhost:9000/api/practicesession/update/${session._id}`, session);
        dispatch({
            type: UPDATE_PSESSION_SUCCESS,
            payload: data
        });
        toast.success("Practice Session updated successfully");
    } catch (error) {
        dispatch({
            type: UPDATE_PSESSION_FAIL,
            payload: error.response.data.error
        });
        toast.error(error.response.data.error);
    }
}