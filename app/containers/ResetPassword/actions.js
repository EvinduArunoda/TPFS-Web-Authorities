/*
 *
 * ResetPassword actions
 *
 */

import * as types from './constants';


// eslint-disable-next-line import/prefer-default-export
export function defaultAction() {
  return {
    type: types.DEFAULT_ACTION
  };
}
export function setPassword(email, code, password) {
  return {
    type: types.SET_PASSWORD,
    email,
    code,
    password
  };
}
