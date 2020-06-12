import {
  all, fork, call, takeEvery, put // select, take were removed
} from 'redux-saga/effects';
import * as types from './constants';
import 'firebase/functions';
import firebase from '../../config/firebaseConfig';
import { success } from './actions';
import { back } from '../PoliceMenProfileSta/actions';
const submitData = async (email, station) => {
  const AssignPoliceStation = await firebase.functions().httpsCallable('AssignPoliceStation');
  return (
    AssignPoliceStation({
      email,
      station
    }).then(result => result.data)
      .catch(error => ({
        status: 'FAILED',
        error: error.message
      }))
  );
};

export function* Submit(action) {
  try {
    const result = yield call(submitData, action.email, action.stationID);
    if (result.status === 'success') {
      alert('Success!!');
      yield put(back());
      yield put(success());
    } else {
      alert('FAILED!! Here' + result.message);
      window.location.href = '/app/Policeman-Profile';
    }
    window.location.href = '/app/Policeman-Profile';
  } catch (e) {
    alert('FAILED!! ');
    window.location.href = '/app/Policeman-Profile';
  }
}

// Individual exports for testing
export function* assignStationSaga() {
  yield takeEvery(types.CHANGE_STATION, Submit);
  // See example in containers/HomePage/saga.js
}

export default function* rootSaga() {
  yield all([
    fork(assignStationSaga),
  ]);
}
