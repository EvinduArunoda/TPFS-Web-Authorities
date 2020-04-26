import { fromJS } from 'immutable';
import handleComplaintsReducer from '../reducer';

describe('handleComplaintsReducer', () => {
  it('returns the initial state', () => {
    // eslint-disable-next-line no-undef
    expect(handleComplaintsReducer(undefined, {})).toEqual(fromJS({}));
  });
});
