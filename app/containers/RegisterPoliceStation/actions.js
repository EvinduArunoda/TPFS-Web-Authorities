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
export function registerPoliceStation(email, password, region, stationID, phonenumber, address) {
  return {
    type: types.REGPOLSTA,
    email,
    password,
    region,
    stationID,
    phonenumber,
    address
  };
}