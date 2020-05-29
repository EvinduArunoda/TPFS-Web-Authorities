import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the assignPoliceStation state domain
 */

const selectAssignPoliceStationDomain = state => state.get('assignPoliceStation', initialState);

/**
 * Other specific selectors
 */

/**
 * Default selector used by AssignPoliceStation
 */

const makeSelectAssignPoliceStation = () => createSelector(
  selectAssignPoliceStationDomain,
  substate => substate.toJS()
);

export default makeSelectAssignPoliceStation;
export { selectAssignPoliceStationDomain };
