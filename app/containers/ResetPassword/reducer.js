/*
 *
 * ResetPassword reducer
 *
 */

import { fromJS } from 'immutable';
import { DEFAULT_ACTION, SET_EMAIL, SET_EMAIL_SUCCESS } from './constants';

export const initialState = fromJS({
  email: null,
  validEmail: false
});

function resetPasswordReducer(state = initialState, action) {
  switch (action.type) {
    case DEFAULT_ACTION:
      return state;
    default:
      return state;

    case SET_EMAIL:
      return state.withMutations((mutableState) => {
        mutableState.setIn(['email'], action.email);
      });

    case SET_EMAIL_SUCCESS:
      return state.withMutations((mutableState) => {
        mutableState.setIn(['email'], action.email);
      });
  }
}

export default resetPasswordReducer;
