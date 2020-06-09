/*
 *
 * AssignPoliceStation reducer
 *
 */

import { fromJS } from 'immutable';
import { DEFAULT_ACTION, ASSIGN_STATION, ASSIGN_SUCCESS } from './constants';

export const initialState = fromJS({
  submitting: false
});

function assignPoliceStationReducer(state = initialState, action) {
  switch (action.type) {
    case DEFAULT_ACTION:
      return state;
    default:
      return state;

    case ASSIGN_STATION:
      return state.withMutations((mutableState) => {
        mutableState.setIn(['submitting'], true);
      });

    case ASSIGN_SUCCESS:
      return state.withMutations((mutableState) => {
        mutableState.setIn(['submitting'], false);
      });
  }
}

export default assignPoliceStationReducer;
