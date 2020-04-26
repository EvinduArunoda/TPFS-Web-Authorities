/*
 *
 * RegisterDrivers reducer
 *
 */

import { fromJS } from 'immutable';
import { DEFAULT_ACTION } from './constants';
// import { REGDRIVER } from '../RegisterPoliceStation/constants';

export const initialState = fromJS({});

function registerDriversReducer(state = initialState, action) {
  switch (action.type) {
    case DEFAULT_ACTION:
      return state;
    default:
      return state;


    // case REGDRIVER:
    //   // eslint-disable-next-line no-unused-vars
    //   return state.withMutations((mutableState) => {
    //     // mutableState.setIn(['usersLogin', 'error'], 'Loading...');
    //     // mutableState.setIn(['usersLogin', 'email'], action.email);
    //   });
  }
}

export default registerDriversReducer;
