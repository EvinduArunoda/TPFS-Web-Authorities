import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the vehicleProfiles state domain
 */

const selectVehicleProfilesDomain = state => state.get('vehicleProfiles', initialState);

/**
 * Other specific selectors
 */

/**
 * Default selector used by VehicleProfiles
 */

const makeSelectVehicleProfiles = () => createSelector(
  selectVehicleProfilesDomain,
  substate => substate.toJS()
);

export default makeSelectVehicleProfiles;
export { selectVehicleProfilesDomain };
