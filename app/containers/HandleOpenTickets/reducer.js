/*
 *
 * HandleOpenTickets reducer
 *
 */

import { fromJS } from 'immutable';
import {
  DEFAULT_ACTION, SET_ID, BACK, CLOSE_TKT
} from './constants';

export const initialState = fromJS({
  id: null,
  status: false, // if paid
  idSet: false
});

function handleOpenTicketsReducer(state = initialState, action) {
  switch (action.type) {
    case DEFAULT_ACTION:
      return state;
    default:
      return state;

    case SET_ID:
      return state.withMutations((mutableState) => {
        mutableState.setIn(['id'], action.id);
        mutableState.setIn(['status'], false);
        mutableState.setIn(['idSet'], true);
      });

    case BACK:
      return state.withMutations((mutableState) => {
        mutableState.setIn(['id'], null);
        mutableState.setIn(['status'], false);
        mutableState.setIn(['idSet'], false);
      });

    case CLOSE_TKT:
      return state.withMutations((mutableState) => {
        mutableState.setIn(['id'], action.id);
        mutableState.setIn(['status'], true);
        mutableState.setIn(['idSet'], true);
      });
  }
}

export default handleOpenTicketsReducer;
