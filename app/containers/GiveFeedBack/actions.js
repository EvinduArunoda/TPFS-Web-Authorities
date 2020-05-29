/*
 *
 * GiveFeedBack actions
 *
 */

import { DEFAULT_ACTION, SUBMIT_FEEDBACK } from './constants';

// eslint-disable-next-line import/prefer-default-export
export function defaultAction() {
  return {
    type: DEFAULT_ACTION
  };
}
export function submitFeedBack(ID, feedback) {
  // console.log('here');
  return {
    type: SUBMIT_FEEDBACK,
    ID,
    feedback
  };
}
