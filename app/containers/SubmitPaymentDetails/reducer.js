/*
 *
 * SubmitPaymentDetails reducer
 *
 */

import { fromJS } from 'immutable';
import { DEFAULT_ACTION, SUBMIT_SUCCESS, SUBMIT_PAYMENT } from './constants';

export const initialState = fromJS({
  loading: false
});

function submitPaymentDetailsReducer(state = initialState, action) {
  switch (action.type) {
    case DEFAULT_ACTION:
      return state;
    default:
      return state;

    case SUBMIT_PAYMENT:
      return state.withMutations((mutableState) => {
        mutableState.setIn(['loading'], true);
      });
    case SUBMIT_SUCCESS:
      return state.withMutations((mutableState) => {
        mutableState.setIn(['loading'], false);
      });
  }
}

export default submitPaymentDetailsReducer;
