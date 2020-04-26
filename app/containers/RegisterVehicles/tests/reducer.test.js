import { fromJS } from 'immutable';
import registerVehiclesReducer from '../reducer';

describe('registerVehiclesReducer', () => {
  it('returns the initial state', () => {
    // eslint-disable-next-line no-undef
    expect(registerVehiclesReducer(undefined, {})).toEqual(fromJS({}));
  });
});
