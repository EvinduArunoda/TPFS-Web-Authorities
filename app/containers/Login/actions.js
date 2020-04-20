/*
 *
 * Login actions
 *
 */

import * as types from './constants';


// eslint-disable-next-line import/prefer-default-export
export function defaultAction() {
  return {
    type: types.DEFAULT_ACTION
  };
}
export function login(email, password) {
  return {
    type: types.LOGIN,
    email,
    password
  };
}
export function logInSuccess() {
  return {
    type: types.LOGIN_SUCCESS
  };
}
export function logInError(e) {
  return {
    type: types.LOGIN_ERROR,
    e
  };
}
export function setError() {
  return {
    type: types.WRONG_USER
  };
}
