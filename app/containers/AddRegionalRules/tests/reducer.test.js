import { fromJS } from 'immutable';
import addRegionalRulesReducer from '../reducer';

describe('addRegionalRulesReducer', () => {
  it('returns the initial state', () => {
    // eslint-disable-next-line no-undef
    expect(addRegionalRulesReducer(undefined, {})).toEqual(fromJS({}));
  });
});
