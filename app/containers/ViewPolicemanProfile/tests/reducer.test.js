import { fromJS } from 'immutable';
import viewPolicemanProfileReducer from '../reducer';

describe('viewPolicemanProfileReducer', () => {
  it('returns the initial state', () => {
    // eslint-disable-next-line no-undef
    expect(viewPolicemanProfileReducer(undefined, {})).toEqual(fromJS({}));
  });
});
