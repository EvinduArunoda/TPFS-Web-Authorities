import { fromJS } from 'immutable';
import feedBckFormReducer from '../reducer';

describe('feedBckFormReducer', () => {
  it('returns the initial state', () => {
    // eslint-disable-next-line no-undef
    expect(feedBckFormReducer(undefined, {})).toEqual(fromJS({}));
  });
});
