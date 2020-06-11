import { fromJS } from 'immutable';
import viewTicketsRtaReducer from '../reducer';

describe('viewTicketsRtaReducer', () => {
  it('returns the initial state', () => {
    // eslint-disable-next-line no-undef
    expect(viewTicketsRtaReducer(undefined, {})).toEqual(fromJS({}));
  });
});
