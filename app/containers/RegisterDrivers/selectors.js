import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the registerDrivers state domain
 */

const selectRegisterDriversDomain = state => state.get('registerDrivers', initialState);

/**
 * Other specific selectors
 */

/**
 * Default selector used by RegisterDrivers
 */

const makeSelectRegisterDrivers = () => createSelector(
  selectRegisterDriversDomain,
  substate => substate.toJS()
);

export default makeSelectRegisterDrivers;
export { selectRegisterDriversDomain };
