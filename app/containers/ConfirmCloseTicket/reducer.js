/*
 *
 * ConfirmCloseTicket reducer
 *
 */

import { fromJS } from 'immutable';
import { DEFAULT_ACTION, CONFIRM, CLOSE_SUCCESS } from './constants';

export const initialState = fromJS({
  loading: false
});

function confirmCloseTicketReducer(state = initialState, action) {
  switch (action.type) {
    case DEFAULT_ACTION:
      return state;
    default:
      return state;

    case CONFIRM:
      return state.withMutations((mutableState) => {
        mutableState.setIn(['loading'], true);
      });
    case CLOSE_SUCCESS:
      return state.withMutations((mutableState) => {
        mutableState.setIn(['loading'], false);
      });
  }
}

export default confirmCloseTicketReducer;
