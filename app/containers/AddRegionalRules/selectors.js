import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the addRegionalRules state domain
 */

const selectAddRegionalRulesDomain = state => state.get('addRegionalRules', initialState);

/**
 * Other specific selectors
 */

/**
 * Default selector used by AddRegionalRules
 */

const makeSelectAddRegionalRules = () => createSelector(
  selectAddRegionalRulesDomain,
  substate => substate.toJS()
);

export default makeSelectAddRegionalRules;
export { selectAddRegionalRulesDomain };
