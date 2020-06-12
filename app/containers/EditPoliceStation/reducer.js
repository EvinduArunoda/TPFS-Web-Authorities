/*
 *
 * EditPoliceStation reducer
 *
 */

import { fromJS } from 'immutable';
import { DEFAULT_ACTION, CHANGE_STATION, SUCCESS } from './constants';

export const initialState = fromJS({
  submitting: false
});

function editPoliceStationReducer(state = initialState, action) {
  switch (action.type) {
    case DEFAULT_ACTION:
      return state;
    default:
      return state;

    case CHANGE_STATION:
      return state.withMutations((mutableState) => {
        mutableState.setIn(['submitting'], true);
      });

    case SUCCESS:
      return state.withMutations((mutableState) => {
        mutableState.setIn(['submitting'], false);
      });
  }
}

export default editPoliceStationReducer;
