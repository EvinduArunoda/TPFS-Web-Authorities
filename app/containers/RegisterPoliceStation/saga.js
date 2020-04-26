import {
  all, fork, call, takeEvery // select, take, put were removed
} from 'redux-saga/effects';
import * as types from './constants';
// import { logInSuccess, logInError } from './actions';
import { COLLECTIONS } from '../../config/dbConstants';
import { firestore } from '../../config/firebaseConfig';


const registerwithmail = async (email, password, region, stationID, phonenumber, address) => {
  // const authUser = await firebase
  //   .auth()
  //   .createUserWithEmailAndPassword(email, password);
  // if (authUser.user == null) {
  //   const err = { message: 'Login Failed' };
  //   throw err;
  // } else {
  await firestore.collection(COLLECTIONS.USER).doc().set({
    address,
    region,
    email,
    phone_number: phonenumber,
    station_id: stationID,
    type: 'policeStation'
  });
  // }
};

export function* Register(action) {
  try {
    yield call(registerwithmail, action.email, action.password, action.region, action.stationID, action.phonenumber, action.address);
    // yield put(logInSuccess());
    window.location.href = '/app/RegisterPoliceStation';
  } catch (e) {
    // yield put(logInError(e));
  }
}

// Individual exports for testing
export function* policeStanRegSaga() {
  yield takeEvery(types.REGPOLSTA, Register);
  // See example in containers/HomePage/saga.js
}

export default function* rootSaga() {
  yield all([
    fork(policeStanRegSaga),
  ]);
}
