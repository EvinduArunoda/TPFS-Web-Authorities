import { fromJS } from 'immutable';
import policeMenProfileStaReducer from '../reducer';

describe('policeMenProfileStaReducer', () => {
  it('returns the initial state', () => {
    // eslint-disable-next-line no-undef
    expect(policeMenProfileStaReducer(undefined, {})).toEqual(fromJS({}));
  });
});
