/*
 *
 * EditPoliceStation actions
 *
 */

import { DEFAULT_ACTION, CHANGE_STATION, SUCCESS } from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION
  };
}
export function assignPoliceStation(email, stationID) {
  return {
    type: CHANGE_STATION,
    email,
    stationID
  };
}
export function success() {
  return {
    type: SUCCESS
  };
}
