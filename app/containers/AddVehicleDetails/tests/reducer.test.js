import { fromJS } from 'immutable';
import addVehicleDetailsReducer from '../reducer';

describe('addVehicleDetailsReducer', () => {
  it('returns the initial state', () => {
    // eslint-disable-next-line no-undef
    expect(addVehicleDetailsReducer(undefined, {})).toEqual(fromJS({}));
  });
});
