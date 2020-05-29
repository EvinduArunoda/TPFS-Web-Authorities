import {
  // eslint-disable-next-line no-unused-vars
  all, fork, call, put, takeEvery // select, take were removed
} from 'redux-saga/effects';
import * as types from './constants';
import { registerSuccess } from './actions';

import firebase from '../../config/firebaseConfig';
import 'firebase/functions';


const registerVehicle = async (insuranceNumber, LicensePlate, makeAndModel, registeredNumber, registeredOwner, ownerID) => {
  const AddVehicle = await firebase.functions().httpsCallable('AddVehicle');
  return (
    AddVehicle({
      insuranceNumber,
      LicensePlate,
      makeAndModel,
      registeredNumber,
      registeredOwner,
      ownerID
    }).then(result => result.data)
      .catch(error => ({
        status: 'FAILED',
        error: error.message
      }))
  );
};

export function* Register(action) {
  try {
    const result = yield call(registerVehicle, action.insuranceNumber, action.LicensePlate, action.makeAndModel, action.registeredNumber, action.registeredOwner, action.ownerID);
    if (result.status === 'success') {
      alert('Success!!');
      console.log('success');
      yield put(registerSuccess());
    } else {
      alert('FAILED!! ' + result.message);
      window.location.href = '/app/RegisterVehicles';
    }
  } catch (e) {
    alert('FAILED!! ');
    window.location.href = '/app/RegisterVehicles';
  }
}

// Individual exports for testing
export function* vehicleRegSaga() {
  yield takeEvery(types.REG_VEHICLE, Register);
  // See example in containers/HomePage/saga.js
}

export default function* rootSaga() {
  yield all([
    fork(vehicleRegSaga),
  ]);
}
