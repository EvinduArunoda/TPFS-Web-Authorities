/*
 *
 * RegisterPoliceman reducer
 *
 */

import { fromJS } from 'immutable';
import {
  DEFAULT_ACTION, REGPOL, REGSUCCESS, SUCCESS
} from './constants';

export const initialState = fromJS({
  email: null,
  registered: false,
  submitting: false
});

function registerPolicemanReducer(state = initialState, action) {
  switch (action.type) {
    case DEFAULT_ACTION:
      return state;
    default:
      return state;

    case REGPOL:
      return state.withMutations((mutableState) => {
        mutableState.setIn(['email'], action.email);
        mutableState.setIn(['submitting'], true);
      });

    case REGSUCCESS:
      return state.withMutations((mutableState) => {
        mutableState.setIn(['registered'], true);
        mutableState.setIn(['submitting'], false);
      });

    case SUCCESS:
      return state.withMutations((mutableState) => {
        mutableState.setIn(['email'], null);
        mutableState.setIn(['registered'], false);
        mutableState.setIn(['submitting'], false);
      });
  }
}

export default registerPolicemanReducer;
