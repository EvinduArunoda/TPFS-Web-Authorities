/*
 *
 * RegisterDrivers reducer
 *
 */

import { fromJS } from 'immutable';
import { DEFAULT_ACTION, REGDRIVER, REGSUCCESS } from './constants';

export const initialState = fromJS({
  email: null,
  registered: false,
  Submitting: false
});

function registerDriversReducer(state = initialState, action) {
  switch (action.type) {
    case DEFAULT_ACTION:
      return state;
    default:
      return state;


    case REGDRIVER:
      return state.withMutations((mutableState) => {
        mutableState.setIn(['email'], action.email);
        mutableState.setIn(['Submitting'], true);
      });

    case REGSUCCESS:
      return state.withMutations((mutableState) => {
        mutableState.setIn(['registered'], true);
        mutableState.setIn(['Submitting'], false);
      });
  }
}

export default registerDriversReducer;
