import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the registerPoliceStation state domain
 */

const selectRegisterPoliceStationDomain = state => state.get('registerPoliceStation', initialState);

/**
 * Other specific selectors
 */

/**
 * Default selector used by RegisterPoliceStation
 */

const makeSelectRegisterPoliceStation = () => createSelector(
  selectRegisterPoliceStationDomain,
  substate => substate.toJS()
);

export default makeSelectRegisterPoliceStation;
export { selectRegisterPoliceStationDomain };
