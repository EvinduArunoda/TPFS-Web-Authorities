import { fromJS } from 'immutable';
import registerPoliceStationReducer from '../reducer';

describe('registerPoliceStationReducer', () => {
  it('returns the initial state', () => {
    // eslint-disable-next-line no-undef
    expect(registerPoliceStationReducer(undefined, {})).toEqual(fromJS({}));
  });
});
