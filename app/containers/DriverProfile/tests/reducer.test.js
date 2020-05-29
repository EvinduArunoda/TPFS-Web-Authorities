import { fromJS } from 'immutable';
import driverProfileReducer from '../reducer';

describe('driverProfileReducer', () => {
  it('returns the initial state', () => {
    // eslint-disable-next-line no-undef
    expect(driverProfileReducer(undefined, {})).toEqual(fromJS({}));
  });
});
