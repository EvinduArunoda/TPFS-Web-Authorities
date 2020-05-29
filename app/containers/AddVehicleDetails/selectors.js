import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the addVehicleDetails state domain
 */

const selectAddVehicleDetailsDomain = state => state.get('addVehicleDetails', initialState);

/**
 * Other specific selectors
 */

/**
 * Default selector used by AddVehicleDetails
 */

const makeSelectAddVehicleDetails = () => createSelector(
  selectAddVehicleDetailsDomain,
  substate => substate.toJS()
);

export default makeSelectAddVehicleDetails;
export { selectAddVehicleDetailsDomain };
