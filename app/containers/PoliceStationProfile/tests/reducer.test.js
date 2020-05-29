import { fromJS } from 'immutable';
import policeStationProfileReducer from '../reducer';

describe('policeStationProfileReducer', () => {
  it('returns the initial state', () => {
    // eslint-disable-next-line no-undef
    expect(policeStationProfileReducer(undefined, {})).toEqual(fromJS({}));
  });
});
