import { fromJS } from 'immutable';
import handleOpenTicketsReducer from '../reducer';

describe('handleOpenTicketsReducer', () => {
  it('returns the initial state', () => {
    // eslint-disable-next-line no-undef
    expect(handleOpenTicketsReducer(undefined, {})).toEqual(fromJS({}));
  });
});
