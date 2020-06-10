import { fromJS } from 'immutable';
import resetPasswordCodeReducer from '../reducer';

describe('resetPasswordCodeReducer', () => {
  it('returns the initial state', () => {
    // eslint-disable-next-line no-undef
    expect(resetPasswordCodeReducer(undefined, {})).toEqual(fromJS({}));
  });
});
