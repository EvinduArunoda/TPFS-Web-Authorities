import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the registerVehicles state domain
 */

const selectRegisterVehiclesDomain = state => state.get('registerVehicles', initialState);

/**
 * Other specific selectors
 */

/**
 * Default selector used by RegisterVehicles
 */

const makeSelectRegisterVehicles = () => createSelector(
  selectRegisterVehiclesDomain,
  substate => substate.toJS()
);

export default makeSelectRegisterVehicles;
export { selectRegisterVehiclesDomain };
