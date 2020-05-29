import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the policeStationProfile state domain
 */

const selectPoliceStationProfileDomain = state => state.get('policeStationProfile', initialState);

/**
 * Other specific selectors
 */

/**
 * Default selector used by PoliceStationProfile
 */

const makeSelectPoliceStationProfile = () => createSelector(
  selectPoliceStationProfileDomain,
  substate => substate.toJS()
);

export default makeSelectPoliceStationProfile;
export { selectPoliceStationProfileDomain };
