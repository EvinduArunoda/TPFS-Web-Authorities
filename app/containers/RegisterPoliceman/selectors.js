import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the registerPoliceman state domain
 */

const selectRegisterPolicemanDomain = state => state.get('registerPoliceman', initialState);

/**
 * Other specific selectors
 */

/**
 * Default selector used by RegisterPoliceman
 */

const makeSelectRegisterPoliceman = () => createSelector(
  selectRegisterPolicemanDomain,
  substate => substate.toJS()
);

export default makeSelectRegisterPoliceman;
export { selectRegisterPolicemanDomain };
