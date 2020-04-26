import { fromJS } from 'immutable';
import registerPolicemanReducer from '../reducer';

describe('registerPolicemanReducer', () => {
  it('returns the initial state', () => {
    // eslint-disable-next-line no-undef
    expect(registerPolicemanReducer(undefined, {})).toEqual(fromJS({}));
  });
});
