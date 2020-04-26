/*
 *
 * Login reducer
 *
 */

import { fromJS } from 'immutable';
import {
  DEFAULT_ACTION, LOGIN, LOGIN_SUCCESS, LOGIN_ERROR, WRONG_USER
} from './constants';

export const initialState = fromJS({
  usersLogin: {
    email: '',
    password: '',
    remember: false,
    error: '',
    loginStatus: false
  }
});
const initialImmutableState = initialState;

function loginReducer(state = initialImmutableState, action) {
  switch (action.type) {
    case DEFAULT_ACTION:
      return state;
    default:
      return state;

    case LOGIN:
      return state.withMutations((mutableState) => {
        mutableState.setIn(['usersLogin', 'error'], 'Loading...');
        mutableState.setIn(['usersLogin', 'email'], action.email);
      });

    case LOGIN_SUCCESS:
      return state.withMutations((mutableState) => {
        mutableState.setIn(['usersLogin', 'loginStatus'], true);
        mutableState.setIn(['usersLogin', 'email'], '');
        mutableState.setIn(['usersLogin', 'error'], '');
      });

    case LOGIN_ERROR:
      return state.withMutations((mutableState) => {
        mutableState.setIn(['usersLogin', 'loginStatus'], false);
        mutableState.setIn(['usersLogin', 'error'], `Login Error :\n\n${action.e.message}`);
      });

    case WRONG_USER:
      return state.withMutations((mutableState) => {
        mutableState.setIn(['usersLogin', 'error'], 'Login Error : You are not allowed to access the WebApp');
        // window.alert(`Login Error :\n\n${action.e.message}`); // eslint-disable-line
        // window.location.href = '/';
      });
  }
}

export default loginReducer;
