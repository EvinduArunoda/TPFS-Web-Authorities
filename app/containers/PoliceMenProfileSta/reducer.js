/*
 *
 * PoliceMenProfileSta reducer
 *
 */

import { fromJS } from 'immutable';
import { DEFAULT_ACTION, BACK, EDIT_STATION } from './constants';

export const initialState = fromJS({
  email: null,
  emailSet: false
});

function policeMenProfileStaReducer(state = initialState, action) {
  switch (action.type) {
    case DEFAULT_ACTION:
      return state;
    default:
      return state;

    case EDIT_STATION:
      return state.withMutations((mutableState) => {
        mutableState.setIn(['email'], action.email);
        mutableState.setIn(['emailSet'], true);
      });

    case BACK:
      return state.withMutations((mutableState) => {
        mutableState.setIn(['email'], null);
        mutableState.setIn(['emailSet'], false);
      });
  }
}

export default policeMenProfileStaReducer;
