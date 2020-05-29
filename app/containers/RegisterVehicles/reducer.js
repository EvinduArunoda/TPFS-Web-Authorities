/*
 *
 * RegisterVehicles reducer
 *
 */

import { fromJS } from 'immutable';
import { DEFAULT_ACTION, REG_SUCCESS, REG_VEHICLE } from './constants';

export const initialState = fromJS({
  LicensePlate: null,
  registered: false
});

function registerVehiclesReducer(state = initialState, action) {
  switch (action.type) {
    case DEFAULT_ACTION:
      return state;
    default:
      return state;

    case REG_VEHICLE:
      return state.withMutations((mutableState) => {
        mutableState.setIn(['LicensePlate'], action.LicensePlate);
      });

    case REG_SUCCESS:
      return state.withMutations((mutableState) => {
        mutableState.setIn(['registered'], true);
      });
  }
}

export default registerVehiclesReducer;
