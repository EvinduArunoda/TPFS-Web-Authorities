/*
 *
 * ConfirmCloseTicket actions
 *
 */

import { DEFAULT_ACTION, CONFIRM, CLOSE_SUCCESS } from './constants';

// eslint-disable-next-line import/prefer-default-export
export function defaultAction() {
  return {
    type: DEFAULT_ACTION
  };
}
export function confirmClose(id) {
  return {
    type: CONFIRM,
    id
  };
}
export function closeSuccess() {
  return {
    type: CLOSE_SUCCESS
  };
}
