import {
  all, fork, call, takeEvery, put // select, take, put were removed
} from 'redux-saga/effects';
import * as types from './constants';
import firebase from '../../config/firebaseConfig';
import 'firebase/functions';
import { registerSuccess } from './actions';

const registerwithmail = async (email, password, region, stationID, phonenumber, address, rta) => {
  const AddPoliceStation = await firebase.functions().httpsCallable('AddPoliceStation');
  return (
    AddPoliceStation({
      address,
      region,
      email,
      phone_number: phonenumber,
      mail_id: email,
      station_id: stationID,
      password,
      rta
    }).then(result => result.data)
      .catch(error => ({
        status: 'FAILED',
        error: error.message
      }))
  );
};

export function* Register(action) {
  try {
    const result = yield call(registerwithmail, action.email, action.password, action.region, action.stationID, action.phonenumber, action.address, action.rta);
    if (result.status === 'success') {
      alert('Success!!');
      window.location.href = '/app/RegisterPoliceStation';
      console.log('success');
      yield put(registerSuccess());
    } else {
      alert('FAILED!! ' + result.message);
      window.location.href = '/app/RegisterPoliceStation';
    }
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
