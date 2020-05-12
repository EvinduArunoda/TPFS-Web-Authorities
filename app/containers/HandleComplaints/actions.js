/*
 *
 * HandleComplaints actions
 *
 */

import { DEFAULT_ACTION, SET_ID, FLIP_RDRCT } from './constants';

// eslint-disable-next-line import/prefer-default-export
export function defaultAction() {
  return {
    type: DEFAULT_ACTION
  };
}
export function setID(id) {
  return {
    type: SET_ID,
    id
  };
}
export function flipRedirect() {
  return {
    type: FLIP_RDRCT,
  };
}
