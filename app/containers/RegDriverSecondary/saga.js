import {
  all, fork, call, takeEvery // select, take were removed
} from 'redux-saga/effects';
import * as types from './constants';
import 'firebase/functions';
import firebase from '../../config/firebaseConfig';

const submitData = async (email, physicalDisabilities, Class) => {
  const AddPhysicalDisabilities = await firebase.functions().httpsCallable('AddPhysicalDisabilities');
  return (
    AddPhysicalDisabilities({
      email,
      Class,
      disabilities: physicalDisabilities
    }).then(result => result.data)
      .catch(error => ({
        status: 'FAILED',
        error: error.message
      }))
  );
};

export function* Submit(action) {
  try {
    const result = yield call(submitData, action.email, action.physicalDisabilities, action.Class);
    if (result.status === 'success') {
      alert('Success!!');
      console.log('success');
      window.location.href = '/app/RegisterDrivers';
    } else {
      alert('FAILED!! ' + result.message);
      window.location.href = '/app/RegisterDrivers';
    }
    window.location.href = '/app/RegisterDrivers';
  } catch (e) {
    alert('FAILED!! ');
    window.location.href = '/app/RegisterDrivers';
  }
}

// Individual exports for testing
export function* driverRegSecSaga() {
  yield takeEvery(types.SUBMIT_DATA, Submit);
  // See example in containers/HomePage/saga.js
}

export default function* rootSaga() {
  yield all([
    fork(driverRegSecSaga),
  ]);
}
