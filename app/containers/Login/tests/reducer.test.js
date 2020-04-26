import { fromJS } from 'immutable';
import loginReducer from '../reducer';

describe('loginReducer', () => {
  it('returns the initial state', () => {
    // eslint-disable-next-line no-undef
    expect(loginReducer(undefined, {})).toEqual(fromJS({}));
  });
});
