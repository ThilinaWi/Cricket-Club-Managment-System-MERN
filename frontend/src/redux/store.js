import { createStore, combineReducers, applyMiddleware } from 'redux';
import { thunk } from 'redux-thunk';
import { composeWithDevTools } from '@redux-devtools/extension';
import { deletePsessionReducer, loadPracticeSessionReducer, loadSinglePsessionReducer, registerPsessionReducer, updatePsessionReducer } from './reducer/pSessionReducer';
import { loadPracticeSessionTypeReducer } from './reducer/pSessionTypeReducer';
import { allUserReducer, singleUserReducer, userDeleteReducer, userProfileReducer, userReducerLogout, userReducerSignIn, userReducerSignUp, userUpdateReducer /*, userApplyEventReducer*/} from './reducer/userReducer';
import { deletePlayerPReducer, loadPlayerPReducer, loadSinglePlayerPReducer } from './reducer/PlayerPReducer';

import {
  deleteEventReducer,
  loadEventReducer,
  loadEventSingleReducer,
  registerAeventReducer,
  updateEventReducer
} from './reducer/eventReducer';

import {
  createEventTypeReducer,
  loadEventTypeReducer
} from './reducer/eventTypeReducer';
import { CoachReducerSignUp, allCoachReducer, coachDeleteReducer, coachUpdateReducer, singleCoachReducer } from './reducer/coachReducer';
//import { modeReducer } from './reducer/themeModeReducer';
// Combine reducers
const reducer = combineReducers({
  //get from Reducer page
    loadPSessions:loadPracticeSessionReducer,  
    sessionTypeAll: loadPracticeSessionTypeReducer,
    signIn:userReducerSignIn,
    logOut:userReducerLogout,
    singlepSession:loadSinglePsessionReducer,
    createpSession:registerPsessionReducer,
    deletepSession:deletePsessionReducer,
    updatepSession:updatePsessionReducer,
    signUp:userReducerSignUp,
    allUsers:allUserReducer,
    deleteUser:userDeleteReducer,
    userProfile:userProfileReducer,
    userUpdate:userUpdateReducer,
    singleUser:singleUserReducer,
    
    allCoach:allCoachReducer,
    deleteCoach:coachDeleteReducer,
    coachUpdate:coachUpdateReducer,
    singlcoach:singleCoachReducer,
    createcoach:CoachReducerSignUp,

    loadPerformances : loadPlayerPReducer,
    loadSinglePerformances:loadSinglePlayerPReducer,
    deleteP: deletePlayerPReducer,
    

    loadEvents: loadEventReducer,
    eventTypeAll: loadEventTypeReducer,
    singleEvent: loadEventSingleReducer,
    //userEventApplication: userApplyEventReducer,
   // mode: modeReducer,
    registerEvent: registerAeventReducer,
    deleteEvent: deleteEventReducer,
    createEventType: createEventTypeReducer,
    updateEvent: updateEventReducer

});

// Initial state
let initialState = {
  signIn:{
    userInfo: localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')):null
  }
};
const middleware = [thunk];
const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
