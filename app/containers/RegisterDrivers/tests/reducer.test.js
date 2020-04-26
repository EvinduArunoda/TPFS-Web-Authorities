import { fromJS } from 'immutable';
import registerDriversReducer from '../reducer';

describe('registerDriversReducer', () => {
  it('returns the initial state', () => {
    // eslint-disable-next-line no-undef
    expect(registerDriversReducer(undefined, {})).toEqual(fromJS({}));
  });
});
