import {
  // eslint-disable-next-line no-unused-vars
  all, fork, call, put, takeEvery // select, take were removed
} from 'redux-saga/effects';
import * as types from './constants';
import { setCodeSuccess } from './actions';

import firebase from '../../config/firebaseConfig';
import 'firebase/functions';


const checkCode = async (code, email) => {
  const CheckCode = await firebase.functions().httpsCallable('CheckCode');
  return (
    CheckCode({
      code,
      email
    }).then(result => result.data)
      .catch(error => ({
        status: 'FAILED',
        error: error.message
      }))
  );
};

export function* callSetCode(action) {
  try {
    const result = yield call(checkCode, action.code, action.email);
    if (result.status === 'success') {
      console.log('success');
      yield put(setCodeSuccess());
    } else {
      alert('FAILED!! ' + result.message);
      window.location.href = '/';
    }
  } catch (e) {
    alert('FAILED!! ');
    window.location.href = '/';
  }
}

// Individual exports for testing
export function* setCode() {
  yield takeEvery(types.SET_CODE, callSetCode);
  // See example in containers/HomePage/saga.js
}

export default function* rootSaga() {
  yield all([
    fork(setCode),
  ]);
}
