import {
  all, fork, call, takeEvery // select, take were removed
} from 'redux-saga/effects';
import * as types from './constants';
// import { logInSuccess, logInError } from './actions';
import { COLLECTIONS } from '../../config/dbConstants';
import { firestore } from '../../config/firebaseConfig';


const registerwithmail = async (email, password, name, address, phonenumber, licenseNumber) => {
  // const authUser = await firebase
  //   .auth()
  //   .createUserWithEmailAndPassword(email, password);
  // if (authUser.user == null) {
  //   const err = { message: 'Login Failed' };
  //   throw err;
  // } else {
  await firestore.collection(COLLECTIONS.DRIVER).doc().set({
    LicenseNumber: licenseNumber,
    PhoneNumber: phonenumber,
    address,
    emailAddress: email,
    name,
    physicalDisabilities: []
  });
  // }
};

export function* Register(action) {
  try {
    yield call(registerwithmail, action.email, action.password, action.name, action.address, action.phonenumber, action.licenseNumber);
    // yield put(logInSuccess());
    window.location.href = '/app/RegisterPoliceStation';
  } catch (e) {
    // yield put(logInError(e));
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
