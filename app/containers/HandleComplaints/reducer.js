/*
 *
 * HandleComplaints reducer
 *
 */

import { fromJS } from 'immutable';
import { DEFAULT_ACTION, SET_ID, FLIP_RDRCT } from './constants';

export const initialState = fromJS({
  id: null,
  redirect: false
});

function handleComplaintsReducer(state = initialState, action) {
  switch (action.type) {
    case DEFAULT_ACTION:
      return state;
    default:
      return state;
    case SET_ID:
      return state.withMutations((mutableState) => {
        mutableState.setIn(['id'], action.id);
        mutableState.setIn(['redirect'], true);
      });
    case FLIP_RDRCT:
      return state.withMutations((mutableState) => {
        mutableState.setIn(['redirect'], false);
        mutableState.setIn(['id'], null);
      });
  }
}

export default handleComplaintsReducer;
