import {
  all, fork, call, takeEvery, put // select, take were removed
} from 'redux-saga/effects';
import firebase, { firestore } from '../../config/firebaseConfig';
import * as types from './constants';
import { COLLECTIONS } from '../../config/dbConstants';
import { submitSuccess } from './actions';

const submit = async (email, title, description) => {
  const webUsers = await firestore.collection('WebUsers').where('email', '==', email).get();
  const userSnap = webUsers.docs[0];
  console.log(userSnap.data());
  // eslint-disable-next-line import/no-named-as-default-member
  const timeStamp = firebase.firestore.FieldValue.serverTimestamp();
  await firestore.collection(COLLECTIONS.NOTIFICATION).doc().set({
    description,
    timestamp: timeStamp,
    title,
    from: userSnap.ref,
    to: 'policemen'
  });
};

export function* submitRule(action) {
  try {
    yield call(submit, action.email, action.title, action.description);
    // alert('Success!!');
    console.log('success');
    yield put(submitSuccess());
    // window.location.href = '/app/HandleComplaints';
  } catch (e) {
    alert('FAILED!! ');
    window.location.href = '/app/Regional-Rules';
  }
}

// Individual exports for testing
export function* feedbackSaga() {
  yield takeEvery(types.SUBMIT_RULE, submitRule);
  // See example in containers/HomePage/saga.js
}

export default function* rootSaga() {
  yield all([
    fork(feedbackSaga),
  ]);
}
