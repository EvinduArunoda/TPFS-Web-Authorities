import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the viewPolicemanProfile state domain
 */

const selectViewPolicemanProfileDomain = state => state.get('viewPolicemanProfile', initialState);

/**
 * Other specific selectors
 */

/**
 * Default selector used by ViewPolicemanProfile
 */

const makeSelectViewPolicemanProfile = () => createSelector(
  selectViewPolicemanProfileDomain,
  substate => substate.toJS()
);

export default makeSelectViewPolicemanProfile;
export { selectViewPolicemanProfileDomain };
