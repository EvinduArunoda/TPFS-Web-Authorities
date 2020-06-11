import { fromJS } from 'immutable';
import changePasswordReducer from '../reducer';

describe('changePasswordReducer', () => {
  it('returns the initial state', () => {
    // eslint-disable-next-line no-undef
    expect(changePasswordReducer(undefined, {})).toEqual(fromJS({}));
  });
});
