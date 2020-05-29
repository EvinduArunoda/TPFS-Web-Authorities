import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the regDriverSecondary state domain
 */

const selectRegDriverSecondaryDomain = state => state.get('regDriverSecondary', initialState);

/**
 * Other specific selectors
 */

/**
 * Default selector used by RegDriverSecondary
 */

const makeSelectRegDriverSecondary = () => createSelector(
  selectRegDriverSecondaryDomain,
  substate => substate.toJS()
);

export default makeSelectRegDriverSecondary;
export { selectRegDriverSecondaryDomain };
