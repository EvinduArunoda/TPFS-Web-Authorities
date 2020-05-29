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
export function registerVehicle(insuranceNumber, LicensePlate, makeAndModel, registeredNumber, registeredOwner, ownerID) {
  return {
    type: types.REG_VEHICLE,
    insuranceNumber,
    makeAndModel,
    LicensePlate,
    registeredNumber,
    registeredOwner,
    ownerID
  };
}

export function registerSuccess() {
  return {
    type: types.REG_SUCCESS
  };
}
