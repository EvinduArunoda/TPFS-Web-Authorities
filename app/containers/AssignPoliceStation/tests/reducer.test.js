import { fromJS } from 'immutable';
import assignPoliceStationReducer from '../reducer';

describe('assignPoliceStationReducer', () => {
  it('returns the initial state', () => {
    // eslint-disable-next-line no-undef
    expect(assignPoliceStationReducer(undefined, {})).toEqual(fromJS({}));
  });
});
