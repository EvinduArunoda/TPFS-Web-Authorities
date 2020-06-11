import {
  all, fork, call, takeEvery, put // select, take were removed
} from 'redux-saga/effects';
import firebase, { firestore } from '../../config/firebaseConfig';
import * as types from './constants';
import { COLLECTIONS } from '../../config/dbConstants';
import { flipRedirect } from '../HandleComplaints/actions';

const submit = async (ID, feedBack) => {
  const original = firestore.collection(COLLECTIONS.COMPLAINT).doc(ID);
  // eslint-disable-next-line import/no-named-as-default-member
  const timeStamp = firebase.firestore.FieldValue.serverTimestamp();
  await firestore.collection(COLLECTIONS.FEEDBACK).doc().set({
    original,
    timestamp: timeStamp,
    feedback: feedBack
  });
  await original.update({
    status: 1
  });
};

export function* submitFeedBack(action) {
  try {
    yield call(submit, action.ID, action.feedback);
    alert('Success!!');
    console.log('success');
    yield put(flipRedirect());
    // window.location.href = '/app/HandleComplaints';
  } catch (e) {
    alert('FAILED!! ');
    window.location.href = '/app/HandleComplaints';
  }
}

// Individual exports for testing
export function* feedbackSaga() {
  yield takeEvery(types.SUBMIT_FEEDBACK, submitFeedBack);
  // See example in containers/HomePage/saga.js
}

export default function* rootSaga() {
  yield all([
    fork(feedbackSaga),
  ]);
}
