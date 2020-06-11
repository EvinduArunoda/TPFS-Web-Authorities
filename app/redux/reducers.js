/**
 * Combine all reducers in this file and export the combined reducers.
 */
import { reducer as form } from 'redux-form/immutable';
import { combineReducers } from 'redux-immutable';
import { connectRouter } from 'connected-react-router/immutable';
import history from 'utils/history';
import { firestoreReducer } from 'redux-firestore';
import { firebaseReducer } from 'react-redux-firebase';

import languageProviderReducer from 'containers/LanguageProvider/reducer';
import login from './modules/login';
import uiReducer from './modules/ui';
import initval from './modules/initForm';
import loginReducer from '../containers/Login/reducer';
import regPoliceMen from '../containers/RegisterPoliceman/reducer';
import regDriver from '../containers/RegisterDrivers/reducer';
import regVehicle from '../containers/RegisterVehicles/reducer';
import regPolSta from '../containers/RegisterPoliceStation/reducer';
import complaintReducer from '../containers/HandleComplaints/reducer';
import openTktReducer from '../containers/HandleOpenTickets/reducer';
import closeTicket from '../containers/ConfirmCloseTicket/reducer';
import submitPayment from '../containers/SubmitPaymentDetails/reducer';
import assignPoliceStation from '../containers/AssignPoliceStation/reducer';
import regDriverSec from '../containers/RegDriverSecondary/reducer';
import addVehicleDetails from '../containers/AddVehicleDetails/reducer';
import ForgetPassword from '../containers/ForgetPassword/reducer';
/**
 * Creates the main reducer with the dynamically injected ones
 */
export default function createReducer(injectedReducers = {}) {
  const rootReducer = combineReducers({
    form,
    login,
    ui: uiReducer,
    initval,
    loginReducer,
    complaintReducer,
    regPoliceMen,
    regDriver,
    regVehicle,
    openTktReducer,
    closeTicket,
    submitPayment,
    assignPoliceStation,
    regPolSta,
    regDriverSec,
    addVehicleDetails,
    ForgetPassword,
    firebase: firebaseReducer,
    firestore: firestoreReducer,
    language: languageProviderReducer,
    router: connectRouter(history),
    ...injectedReducers,
  });

  // Wrap the root reducer and return a new root reducer with router state
  const mergeWithRouterState = connectRouter(history);
  return mergeWithRouterState(rootReducer);
}
