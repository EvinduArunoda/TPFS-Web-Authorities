import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the giveFeedBack state domain
 */

const selectGiveFeedBackDomain = state => state.get('giveFeedBack', initialState);

/**
 * Other specific selectors
 */

/**
 * Default selector used by GiveFeedBack
 */

const makeSelectGiveFeedBack = () => createSelector(
  selectGiveFeedBackDomain,
  substate => substate.toJS()
);

export default makeSelectGiveFeedBack;
export { selectGiveFeedBackDomain };
