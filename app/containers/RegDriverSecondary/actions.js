/*
 *
 * RegDriverSecondary actions
 *
 */

import { DEFAULT_ACTION, SUBMIT_DATA, SUBMIT_SUCCESS } from './constants';

// eslint-disable-next-line import/prefer-default-export
export function defaultAction() {
  return {
    type: DEFAULT_ACTION
  };
}

export function submitData(email, physicalDisabilities, Class) {
  return {
    type: SUBMIT_DATA,
    email,
    physicalDisabilities,
    Class
  };
}
export function submitSuccess() {
  return {
    type: SUBMIT_SUCCESS
  };
}
