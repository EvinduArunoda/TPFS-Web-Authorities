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
export function setEmail(email) {
  return {
    type: types.SET_EMAIL,
    email
  };
}
export function setEmailSuccess() {
  return {
    type: types.SET_EMAIL_SUCCESS
  };
}
