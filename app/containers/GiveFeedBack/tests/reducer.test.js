import { fromJS } from 'immutable';
import giveFeedBackReducer from '../reducer';

describe('giveFeedBackReducer', () => {
  it('returns the initial state', () => {
    // eslint-disable-next-line no-undef
    expect(giveFeedBackReducer(undefined, {})).toEqual(fromJS({}));
  });
});
