import {
  all, fork, call, put, takeEvery // select, take were removed
} from 'redux-saga/effects';
import firebase from '../../config/firebaseConfig';
import * as types from './constants';
import { logInSuccess, logInError } from './actions';


const loginwithmail = async (email, password) => {
  const authUser = await firebase
    .auth()
    .signInWithEmailAndPassword(email, password);
  if (authUser.user == null) {
    const err = { message: 'Login Failed' };
    throw err;
  }
};

export function* loginAuth(action) {
  try {
    yield call(loginwithmail, action.email, action.password);
    yield put(logInSuccess());
  } catch (e) {
    yield put(logInError(e));
  }
}

// Individual exports for testing
export function* loginSaga() {
  yield takeEvery(types.LOGIN, loginAuth);
  // See example in containers/HomePage/saga.js
}

export default function* rootSaga() {
  yield all([
    fork(loginSaga),
  ]);
}
