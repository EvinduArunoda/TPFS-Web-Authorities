import { fromJS } from 'immutable';
import regDriverSecondaryReducer from '../reducer';

describe('regDriverSecondaryReducer', () => {
  it('returns the initial state', () => {
    // eslint-disable-next-line no-undef
    expect(regDriverSecondaryReducer(undefined, {})).toEqual(fromJS({}));
  });
});
