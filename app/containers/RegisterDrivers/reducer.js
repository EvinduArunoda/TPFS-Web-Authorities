/*
 *
 * RegisterDrivers reducer
 *
 */

import { fromJS } from 'immutable';
import { DEFAULT_ACTION, REGDRIVER, REGSUCCESS } from './constants';

export const initialState = fromJS({
  email: null,
  registered: false
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
      });

    case REGSUCCESS:
      return state.withMutations((mutableState) => {
        mutableState.setIn(['registered'], true);
      });
  }
}

export default registerDriversReducer;
