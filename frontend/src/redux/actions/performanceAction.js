import axios from 'axios';
import {Performance_DELETE_FAIL, Performance_DELETE_REQUEST, Performance_DELETE_SUCCESS, Performance_LOAD_FAIL, Performance_LOAD_REQUEST, Performance_LOAD_SUCCESS,
     SPerformance_LOAD_FAIL, SPerformance_LOAD_REQUEST, SPerformance_LOAD_SUCCESS } from "../constant/performPConstant"


export const PerformanceLoadAction = (pageNumber, keyword = '',MainRole='') => async (dispatch) => {
    dispatch({ type: Performance_LOAD_REQUEST });
    try {
        const { data } = await axios.get(`http://localhost:9000/api/performance/?pageNumber=${pageNumber}&keyword=${keyword}&MainRole=${MainRole}`)
        dispatch({
            type: Performance_LOAD_SUCCESS,
            payload: data
        });
    } catch (error) {
        dispatch({
            type: Performance_LOAD_FAIL,
            payload: error.response.data.error
        });
    }
}
export const SinglePerformanceLoadAction = (ID) => async (dispatch) => {
    dispatch({ type: SPerformance_LOAD_REQUEST });
    try {
        const { data } = await axios.get(`http://localhost:9000/api/performance/${ID}`)
        dispatch({
            type: SPerformance_LOAD_SUCCESS,
            payload: data
        });
    } catch (error) {
        dispatch({
            type: SPerformance_LOAD_FAIL,
            payload: error.response.data.error
        });
    }
}


export const PerformanceDeleteAction = (ID) => async (dispatch) => {
    dispatch({ type: Performance_DELETE_REQUEST });
    try {
        const { data } = await axios.delete(`http://localhost:9000/api/admin/performance/delete/${ID}`)
        dispatch({
            type: Performance_DELETE_SUCCESS,
            payload: data
        });
    } catch (error) {
        dispatch({
            type: Performance_DELETE_FAIL,
            payload: error.response.data.error
        });
    }
}

// In your performanceAction.js or wherever you keep your Redux actions
/*export const PerformanceDeleteAction = (id) => async (dispatch) => {
    try {
      // Optionally, you can perform the delete request here and dispatch only upon success
      dispatch({
        type: 'PERFORMANCE_DELETE',
        payload: id,
      });
    } catch (error) {
      console.error('Error during deletion action dispatch:', error);
      // You might want to handle errors, e.g., dispatching an error action
    }
  };
*/






