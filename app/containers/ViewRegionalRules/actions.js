/*
 *
 * ViewRegionalRules actions
 *
 */

import { DEFAULT_ACTION, DELETE_RULE } from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION
  };
}
export function deleteRule(id) {
  return {
    type: DELETE_RULE,
    id
  };
}
