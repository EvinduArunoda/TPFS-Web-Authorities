import {
  // eslint-disable-next-line no-unused-vars
  all, fork, call, put, takeEvery // select, take were removed
} from 'redux-saga/effects';
import * as types from './constants';
import { setEmailSuccess } from '../ForgetPassword/actions';

import firebase from '../../config/firebaseConfig';
import 'firebase/functions';


const askCode = async (email) => {
  const SendCode = await firebase.functions().httpsCallable('SendCode');
  return (
    SendCode({
      email
    }).then(result => result.data)
      .catch(error => ({
        status: 'FAILED',
        error: error.message
      }))
  );
};

export function* callSetEmail(action) {
  try {
    const result = yield call(askCode, action.email);
    if (result.status === 'success') {
      console.log('success');
      yield put(setEmailSuccess());
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
export function* setEmail() {
  yield takeEvery(types.SUBMIT_EMAIL, callSetEmail);
  // See example in containers/HomePage/saga.js
}

export default function* rootSaga() {
  yield all([
    fork(setEmail),
  ]);
}
