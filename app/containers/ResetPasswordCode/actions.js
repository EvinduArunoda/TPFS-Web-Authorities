/*
 *
 * ResetPasswordCode actions
 *
 */

import * as types from './constants';

// eslint-disable-next-line import/prefer-default-export
export function defaultAction() {
  return {
    type: types.DEFAULT_ACTION
  };
}
export function setCode(code, email) {
  return {
    type: types.SET_CODE,
    code,
    email
  };
}
export function setCodeSuccess() {
  return {
    type: types.SET_CODE_SUCCESS
  };
}
