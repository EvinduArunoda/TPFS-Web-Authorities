import {
  all, fork, call, takeEvery, put // select, take were removed
} from 'redux-saga/effects';
import * as types from './constants';
import 'firebase/functions';
import firebase, { firestore } from '../../config/firebaseConfig';
import { COLLECTIONS } from '../../config/dbConstants';
import { closeSuccess } from './actions';

const closeTicket = async (id) => {
  const Ticket = firestore.collection(COLLECTIONS.TICKET).doc(id);
  // eslint-disable-next-line import/no-named-as-default-member
  const Time = firebase.firestore.FieldValue.serverTimestamp();
  await Ticket.update({
    Status: 'closed',
    ClosedTime: Time
  });
};

export function* Submit(action) {
  try {
    yield call(closeTicket, action.id);
    yield put(closeSuccess());
    window.location.href = '/app/HandleOpenTickets';
  } catch (e) {
    alert('FAILED!! ');
    window.location.href = '/app/HandleOpenTickets';
  }
}

// Individual exports for testing
export function* closeTicketSaga() {
  yield takeEvery(types.CONFIRM, Submit);
  // See example in containers/HomePage/saga.js
}

export default function* rootSaga() {
  yield all([
    fork(closeTicketSaga),
  ]);
}
