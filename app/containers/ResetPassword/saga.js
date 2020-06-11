import {
  // eslint-disable-next-line no-unused-vars
  all, fork, call, put, takeEvery // select, take were removed
} from 'redux-saga/effects';
import * as types from './constants';

import firebase from '../../config/firebaseConfig';
import 'firebase/functions';


const resetPassword = async (email, code, password) => {
  const ResetPassword = await firebase.functions().httpsCallable('ResetPassword');
  return (
    ResetPassword({
      email,
      code,
      password
    }).then(result => result.data)
      .catch(error => ({
        status: 'FAILED',
        error: error.message
      }))
  );
};

export function* callSetPassword(action) {
  try {
    const result = yield call(resetPassword, action.email, action.code, action.password);
    if (result.status === 'success') {
      alert('New Password is Set!!');
      console.log('success');
      window.location.href = '/';
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
export function* setPassword() {
  yield takeEvery(types.SET_PASSWORD, callSetPassword);
  // See example in containers/HomePage/saga.js
}

export default function* rootSaga() {
  yield all([
    fork(setPassword),
  ]);
}
