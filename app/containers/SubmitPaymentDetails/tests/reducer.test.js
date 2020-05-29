import { fromJS } from 'immutable';
import submitPaymentDetailsReducer from '../reducer';

describe('submitPaymentDetailsReducer', () => {
  it('returns the initial state', () => {
    // eslint-disable-next-line no-undef
    expect(submitPaymentDetailsReducer(undefined, {})).toEqual(fromJS({}));
  });
});
