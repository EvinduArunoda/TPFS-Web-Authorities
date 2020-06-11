/*
 *
 * ChangePassword actions
 *
 */

import { DEFAULT_ACTION, SUBMIT_EMAIL } from './constants';

// eslint-disable-next-line import/prefer-default-export
export function defaultAction() {
  return {
    type: DEFAULT_ACTION
  };
}
export function submitEmail(email) {
  return {
    type: SUBMIT_EMAIL,
    email
  };
}
