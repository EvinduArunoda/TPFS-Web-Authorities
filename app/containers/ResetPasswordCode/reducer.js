/*
 *
 * ResetPasswordCode reducer
 *
 */

import { fromJS } from 'immutable';
import { DEFAULT_ACTION, SET_CODE_SUCCESS, SET_CODE } from './constants';

export const initialState = fromJS({
  code: null,
  validCode: false
});

function resetPasswordCodeReducer(state = initialState, action) {
  switch (action.type) {
    case DEFAULT_ACTION:
      return state;
    default:
      return state;

    case SET_CODE:
      return state.withMutations((mutableState) => {
        mutableState.setIn(['code'], action.code);
      });
    case SET_CODE_SUCCESS:
      return state.withMutations((mutableState) => {
        mutableState.setIn(['validCode'], true);
      });
  }
}

export default resetPasswordCodeReducer;
