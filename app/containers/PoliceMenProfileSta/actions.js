/*
 *
 * PoliceMenProfileSta actions
 *
 */

import { DEFAULT_ACTION, BACK, EDIT_STATION } from './constants';

// eslint-disable-next-line import/prefer-default-export
export function defaultAction() {
  return {
    type: DEFAULT_ACTION
  };
}
export function editStation(email) {
  console.log(email);
  return {
    type: EDIT_STATION,
    email
  };
}
export function back() {
  return {
    type: BACK
  };
}
