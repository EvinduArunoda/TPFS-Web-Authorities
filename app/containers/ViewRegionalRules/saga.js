import {
  all, fork, call, takeEvery // select, take were removed
} from 'redux-saga/effects';
import * as types from './constants';
import { firestore } from '../../config/firebaseConfig';
import { COLLECTIONS } from '../../config/dbConstants';

const submitData = async (id) => {
  const notification = await firestore.collection(COLLECTIONS.NOTIFICATION).doc(id);
  await notification.delete();
};

export function* Delete(action) {
  try {
    yield call(submitData, action.id);
    console.log('Success');
  } catch (e) {
    alert('FAILED!! ');
    window.location.href = '/app/Manage-Rules';
  }
}

// Individual exports for testing
export function* deleteRuleSaga() {
  yield takeEvery(types.DELETE_RULE, Delete);
  // See example in containers/HomePage/saga.js
}

export default function* rootSaga() {
  yield all([
    fork(deleteRuleSaga),
  ]);
}
