/*
 *
 * AddVehicleDetails reducer
 *
 */

import { fromJS } from 'immutable';
import { DEFAULT_ACTION, SUBMIT_SUCCESS, SUBMIT_DATA } from './constants';

export const initialState = fromJS({
  Submitting: false
});

function addVehicleDetailsReducer(state = initialState, action) {
  switch (action.type) {
    case DEFAULT_ACTION:
      return state;
    default:
      return state;

    case SUBMIT_DATA:
      return state.withMutations((mutableState) => {
        mutableState.setIn(['Submitting'], true);
      });

    case SUBMIT_SUCCESS:
      return state.withMutations((mutableState) => {
        mutableState.setIn(['Submitting'], false);
      });
  }
}

export default addVehicleDetailsReducer;
