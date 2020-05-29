/*
 *
 * AssignPoliceStation actions
 *
 */

import { DEFAULT_ACTION, ASSIGN_STATION } from './constants';

// eslint-disable-next-line import/prefer-default-export
export function defaultAction() {
  return {
    type: DEFAULT_ACTION
  };
}
export function assignPoliceStation(email, station) {
  return {
    type: ASSIGN_STATION,
    email,
    station
  };
}
