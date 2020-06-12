import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the editPoliceStation state domain
 */

const selectEditPoliceStationDomain = state => state.get('editPoliceStation', initialState);

/**
 * Other specific selectors
 */

/**
 * Default selector used by EditPoliceStation
 */

const makeSelectEditPoliceStation = () => createSelector(
  selectEditPoliceStationDomain,
  substate => substate.toJS()
);

export default makeSelectEditPoliceStation;
export { selectEditPoliceStationDomain };
