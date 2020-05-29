import {
  // eslint-disable-next-line no-unused-vars
  all, fork, call, put, takeEvery // select, take were removed
} from 'redux-saga/effects';
import * as types from './constants';
import { registerSuccess } from './actions';

import firebase from '../../config/firebaseConfig';
import 'firebase/functions';


const registerwithmail = async (email, password, firstName, lastName, phonenumber, address, employeeID) => {
  const AddPoliceMen = await firebase.functions().httpsCallable('AddPoliceMen');
  return (
    AddPoliceMen({
      address,
      employee_id: employeeID,
      first_name: firstName,
      last_name: lastName,
      mail_id: email,
      phone_number: phonenumber,
      password
    }).then(result => result.data)
      .catch(error => ({
        status: 'FAILED',
        error: error.message
      }))
  );
};

export function* Register(action) {
  try {
    const result = yield call(registerwithmail, action.email, action.password, action.firstName, action.lastName, action.phonenumber, action.address, action.employeeID);
    if (result.status === 'success') {
      alert('Success!!');
      console.log('success');
      yield put(registerSuccess());
    } else {
      alert('FAILED!! ' + result.message);
      window.location.href = '/app/RegisterPolicemen';
    }
  } catch (e) {
    alert('FAILED!! ');
    window.location.href = '/app/RegisterPolicemen';
  }
}

// Individual exports for testing
export function* loginpolicemanRegSaga() {
  yield takeEvery(types.REGPOL, Register);
  // See example in containers/HomePage/saga.js
}

export default function* rootSaga() {
  yield all([
    fork(loginpolicemanRegSaga),
  ]);
}
