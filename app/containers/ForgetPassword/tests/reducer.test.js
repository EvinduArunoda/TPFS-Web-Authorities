import { fromJS } from 'immutable';
import forgetPasswordReducer from '../reducer';

describe('forgetPasswordReducer', () => {
  it('returns the initial state', () => {
    // eslint-disable-next-line no-undef
    expect(forgetPasswordReducer(undefined, {})).toEqual(fromJS({}));
  });
});
