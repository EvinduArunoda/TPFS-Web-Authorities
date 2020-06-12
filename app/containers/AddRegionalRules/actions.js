/*
 *
 * AddRegionalRules actions
 *
 */

import { DEFAULT_ACTION, SUBMIT_SUCCESS, SUBMIT_RULE } from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION
  };
}
export function submitRule(email, title, description) {
  console.log(email, title, description);
  return {
    type: SUBMIT_RULE,
    email,
    title,
    description
  };
}
export function submitSuccess() {
  return {
    type: SUBMIT_SUCCESS
  };
}
