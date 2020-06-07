/*
 *
 * SubmitPaymentDetails actions
 *
 */

import { DEFAULT_ACTION, SUBMIT_PAYMENT, SUBMIT_SUCCESS } from './constants';

// eslint-disable-next-line import/prefer-default-export
export function defaultAction() {
  return {
    type: DEFAULT_ACTION
  };
}
export function submitPayment(id, receiptNo) {
  return {
    type: SUBMIT_PAYMENT,
    id,
    receiptNo
  };
}
export function submitSuccess() {
  return {
    type: SUBMIT_SUCCESS,
  };
}
