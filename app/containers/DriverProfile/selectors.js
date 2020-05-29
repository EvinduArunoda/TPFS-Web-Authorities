import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the driverProfile state domain
 */

const selectDriverProfileDomain = state => state.get('driverProfile', initialState);

/**
 * Other specific selectors
 */

/**
 * Default selector used by DriverProfile
 */

const makeSelectDriverProfile = () => createSelector(
  selectDriverProfileDomain,
  substate => substate.toJS()
);

export default makeSelectDriverProfile;
export { selectDriverProfileDomain };
