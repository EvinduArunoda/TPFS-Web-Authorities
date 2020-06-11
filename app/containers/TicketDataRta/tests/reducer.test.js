import { fromJS } from 'immutable';
import ticketDataRtaReducer from '../reducer';

describe('ticketDataRtaReducer', () => {
  it('returns the initial state', () => {
    // eslint-disable-next-line no-undef
    expect(ticketDataRtaReducer(undefined, {})).toEqual(fromJS({}));
  });
});
