import {
  all, fork, call, takeEvery, put // select, take were removed
} from 'redux-saga/effects';
import * as types from './constants';
import 'firebase/functions';
import firebase from '../../config/firebaseConfig';
import { assignSuccess } from './actions';
import { Success } from '../RegisterPoliceman/actions';
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
    const result = yield call(submitData, action.email, action.station);
    if (result.status === 'success') {
      alert('Success!!');
      yield put(assignSuccess());
      yield put(Success());
    } else {
      alert('FAILED!! Here' + result.message);
      window.location.href = '/app/RegisterPolicemen';
    }
    window.location.href = '/app/RegisterPolicemen';
  } catch (e) {
    alert('FAILED!! ');
    window.location.href = '/app/RegisterPolicemen';
  }
}

// Individual exports for testing
export function* assignStationSaga() {
  yield takeEvery(types.ASSIGN_STATION, Submit);
  // See example in containers/HomePage/saga.js
}

export default function* rootSaga() {
  yield all([
    fork(assignStationSaga),
  ]);
}
