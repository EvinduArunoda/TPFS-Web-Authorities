import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the viewRegionalRules state domain
 */

const selectViewRegionalRulesDomain = state => state.get('viewRegionalRules', initialState);

/**
 * Other specific selectors
 */

/**
 * Default selector used by ViewRegionalRules
 */

const makeSelectViewRegionalRules = () => createSelector(
  selectViewRegionalRulesDomain,
  substate => substate.toJS()
);

export default makeSelectViewRegionalRules;
export { selectViewRegionalRulesDomain };
