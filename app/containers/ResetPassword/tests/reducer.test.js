import { fromJS } from 'immutable';
import resetPasswordReducer from '../reducer';

describe('resetPasswordReducer', () => {
  it('returns the initial state', () => {
    // eslint-disable-next-line no-undef
    expect(resetPasswordReducer(undefined, {})).toEqual(fromJS({}));
  });
});
