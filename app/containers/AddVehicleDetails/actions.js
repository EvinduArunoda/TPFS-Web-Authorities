/*
 *
 * AddVehicleDetails actions
 *
 */

import { DEFAULT_ACTION, SUBMIT_DATA } from './constants';

// eslint-disable-next-line import/prefer-default-export
export function defaultAction() {
  return {
    type: DEFAULT_ACTION
  };
}

export function submitData(LicensePlate, VehicleConditions, Class) {
  return {
    type: SUBMIT_DATA,
    LicensePlate,
    VehicleConditions,
    Class
  };
}
