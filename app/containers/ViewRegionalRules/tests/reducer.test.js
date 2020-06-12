import { fromJS } from 'immutable';
import viewRegionalRulesReducer from '../reducer';

describe('viewRegionalRulesReducer', () => {
  it('returns the initial state', () => {
    // eslint-disable-next-line no-undef
    expect(viewRegionalRulesReducer(undefined, {})).toEqual(fromJS({}));
  });
});
