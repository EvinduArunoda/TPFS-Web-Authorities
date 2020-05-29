import { fromJS } from 'immutable';
import enterPaymentDetailsReducer from '../reducer';

describe('enterPaymentDetailsReducer', () => {
  it('returns the initial state', () => {
    // eslint-disable-next-line no-undef
    expect(enterPaymentDetailsReducer(undefined, {})).toEqual(fromJS({}));
  });
});
