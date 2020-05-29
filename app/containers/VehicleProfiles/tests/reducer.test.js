import { fromJS } from 'immutable';
import vehicleProfilesReducer from '../reducer';

describe('vehicleProfilesReducer', () => {
  it('returns the initial state', () => {
    // eslint-disable-next-line no-undef
    expect(vehicleProfilesReducer(undefined, {})).toEqual(fromJS({}));
  });
});
