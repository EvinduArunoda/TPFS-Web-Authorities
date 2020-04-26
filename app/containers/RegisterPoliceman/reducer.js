/*
 *
 * RegisterPoliceman reducer
 *
 */

import { fromJS } from 'immutable';
import { DEFAULT_ACTION, REGPOL } from './constants';

export const initialState = fromJS({});

function registerPolicemanReducer(state = initialState, action) {
  switch (action.type) {
    case DEFAULT_ACTION:
      return state;
    default:
      return state;

    case REGPOL:
      // eslint-disable-next-line no-unused-vars
      return state.withMutations((mutableState) => {
        // mutableState.setIn(['usersLogin', 'error'], 'Loading...');
        // mutableState.setIn(['usersLogin', 'email'], action.email);
      });
  }
}

export default registerPolicemanReducer;
