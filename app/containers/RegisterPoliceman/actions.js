/*
 *
 * RegisterPoliceman actions
 *
 */

import * as types from './constants';


// eslint-disable-next-line import/prefer-default-export
export function defaultAction() {
  return {
    type: types.DEFAULT_ACTION
  };
}
export function registerPoliceman(email, firstName, lastName, phonenumber, address, employeeID) {
  return {
    type: types.REGPOL,
    email,
    firstName,
    lastName,
    phonenumber,
    address,
    employeeID
  };
}

export function registerSuccess() {
  return {
    type: types.REGSUCCESS
  };
}
export function Success() {
  return {
    type: types.SUCCESS
  };
}
