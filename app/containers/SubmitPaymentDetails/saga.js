import {
  all, fork, call, takeEvery, put // select, take were removed
} from 'redux-saga/effects';
import * as types from './constants';
import 'firebase/functions';
import firebase from '../../config/firebaseConfig';
import { submitSuccess } from './actions';
import { reset } from '../HandleOpenTickets/actions';

const submitPayment = async (id, receiptNo) => {
  const AddManualPayment = await firebase.functions().httpsCallable('AddManualPayment');
  return (
    AddManualPayment({
      id,
      receiptNo
    }).then(result => result.data)
      .catch(error => ({
        status: 'FAILED',
        error: error.message
      }))
  );
};

export function* Submit(action) {
  try {
    const result = yield call(submitPayment, action.id, action.receiptNo);

    if (result.status === 'success') {
      yield put(submitSuccess());
      yield put(reset());
    } else {
      alert('FAILED!! ' + result.message);
      window.location.href = '/app/HandleOpenTickets';
    }
  } catch (e) {
    alert('FAILED!! ');
    window.location.href = '/app/HandleOpenTickets';
  }
}

// Individual exports for testing
export function* closeTicketSaga() {
  yield takeEvery(types.SUBMIT_PAYMENT, Submit);
  // See example in containers/HomePage/saga.js
}

export default function* rootSaga() {
  yield all([
    fork(closeTicketSaga),
  ]);
}
