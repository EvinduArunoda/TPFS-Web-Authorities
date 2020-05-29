/*
 *
 * RegisterDrivers actions
 *
 */

import * as types from './constants';


// eslint-disable-next-line import/prefer-default-export
export function defaultAction() {
  return {
    type: types.DEFAULT_ACTION
  };
}
export function registerDrivers(email, password, name, address, phonenumber, licenseNumber, nic, rta) {
  console.log(rta);
  return {
    type: types.REGDRIVER,
    email,
    password,
    phonenumber,
    address,
    licenseNumber,
    nic,
    name
  };
}
export function registerSuccess() {
  return {
    type: types.REGSUCCESS,
  };
}
