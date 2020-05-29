import { fromJS } from 'immutable';
import viewTicketsReducer from '../reducer';

describe('viewTicketsReducer', () => {
  it('returns the initial state', () => {
    // eslint-disable-next-line no-undef
    expect(viewTicketsReducer(undefined, {})).toEqual(fromJS({}));
  });
});
