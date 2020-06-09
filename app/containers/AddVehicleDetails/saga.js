import {
  all, fork, call, takeEvery, put // select, take were removed
} from 'redux-saga/effects';
import * as types from './constants';
import 'firebase/functions';
import firebase from '../../config/firebaseConfig';
import { submitSuccess } from './actions';

const submitData = async (LicensePlate, VehicleConditions, Class) => {
  const AddVehicleDetails = await firebase.functions().httpsCallable('AddVehicleDetails');
  return (
    AddVehicleDetails({
      LicensePlate,
      VehicleClass: Class,
      vehicleConditionAndClasses: VehicleConditions
    }).then(result => result.data)
      .catch(error => ({
        status: 'FAILED',
        error: error.message
      }))
  );
};

export function* Submit(action) {
  try {
    const result = yield call(submitData, action.LicensePlate, action.VehicleConditions, action.Class);
    if (result.status === 'success') {
      alert('Success!!');
      yield put(submitSuccess());
      window.location.href = '/app/RegisterVehicles';
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
export function* addVehicleDetailSaga() {
  yield takeEvery(types.SUBMIT_DATA, Submit);
  // See example in containers/HomePage/saga.js
}

export default function* rootSaga() {
  yield all([
    fork(addVehicleDetailSaga),
  ]);
}
