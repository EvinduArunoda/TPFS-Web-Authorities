/*
 *
 * AssignPoliceStation reducer
 *
 */

import { fromJS } from 'immutable';
import { DEFAULT_ACTION } from './constants';

export const initialState = fromJS({});

function assignPoliceStationReducer(state = initialState, action) {
  switch (action.type) {
    case DEFAULT_ACTION:
      return state;
    default:
      return state;
  }
}

export default assignPoliceStationReducer;
