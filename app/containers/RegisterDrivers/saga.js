import {
  all, fork, call, takeEvery, put // select, take were removed
} from 'redux-saga/effects';
import * as types from './constants';
import { registerSuccess } from './actions';
import 'firebase/functions';
import firebase from '../../config/firebaseConfig';


const registerwithmail = async (email, name, address, phonenumber, licenseNumber, nic) => {
  const AddDriver = await firebase.functions().httpsCallable('AddDriver');
  return (
    AddDriver({
      LicenseNumber: licenseNumber,
      PhoneNumber: phonenumber,
      address,
      emailAddress: email,
      name,
      NIC: nic
    }).then(result => result.data)
      .catch(error => ({
        status: 'FAILED',
        error: error.message
      }))
  );
};

export function* Register(action) {
  try {
    const result = yield call(registerwithmail, action.email, action.name, action.address, action.phonenumber, action.licenseNumber, action.nic);
    if (result.status === 'success') {
      alert('Success!!');
      console.log('success');
      yield put(registerSuccess());
    } else {
      alert('FAILED!! ' + result.message);
      window.location.href = '/app/RegisterDrivers';
    }
  } catch (e) {
    alert('FAILED!! ');
    window.location.href = '/app/RegisterDrivers';
  }
}

// Individual exports for testing
export function* driverRegSaga() {
  yield takeEvery(types.REGDRIVER, Register);
  // See example in containers/HomePage/saga.js
}

export default function* rootSaga() {
  yield all([
    fork(driverRegSaga),
  ]);
}
