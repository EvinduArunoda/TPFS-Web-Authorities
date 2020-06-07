/*
 *
 * HandleOpenTickets actions
 *
 */

import {
  DEFAULT_ACTION, SET_ID, CLOSE_TKT, BACK, RESET
} from './constants';

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
export function closeTicket(id) {
  return {
    type: CLOSE_TKT,
    id
  };
}
export function back() {
  return {
    type: BACK
  };
}
export function reset() {
  return {
    type: RESET
  };
}
