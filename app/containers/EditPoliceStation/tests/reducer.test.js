import { fromJS } from 'immutable';
import editPoliceStationReducer from '../reducer';

describe('editPoliceStationReducer', () => {
  it('returns the initial state', () => {
    // eslint-disable-next-line no-undef
    expect(editPoliceStationReducer(undefined, {})).toEqual(fromJS({}));
  });
});
