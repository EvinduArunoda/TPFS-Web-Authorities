import { fromJS } from 'immutable';
import confirmCloseTicketReducer from '../reducer';

describe('confirmCloseTicketReducer', () => {
  it('returns the initial state', () => {
    // eslint-disable-next-line no-undef
    expect(confirmCloseTicketReducer(undefined, {})).toEqual(fromJS({}));
  });
});
