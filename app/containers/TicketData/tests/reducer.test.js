import { fromJS } from 'immutable';
import ticketDataReducer from '../reducer';

describe('ticketDataReducer', () => {
  it('returns the initial state', () => {
    // eslint-disable-next-line no-undef
    expect(ticketDataReducer(undefined, {})).toEqual(fromJS({}));
  });
});
