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
export function registerPoliceman(email, password, firstName, lastName, phonenumber, stationID, address, employeeID) {
  return {
    type: types.REGPOL,
    email,
    password,
    firstName,
    lastName,
    phonenumber,
    stationID,
    address,
    employeeID
  };
}