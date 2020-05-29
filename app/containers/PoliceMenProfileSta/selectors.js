import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the policeMenProfileSta state domain
 */

const selectPoliceMenProfileStaDomain = state => state.get('policeMenProfileSta', initialState);

/**
 * Other specific selectors
 */

/**
 * Default selector used by PoliceMenProfileSta
 */

const makeSelectPoliceMenProfileSta = () => createSelector(
  selectPoliceMenProfileStaDomain,
  substate => substate.toJS()
);

export default makeSelectPoliceMenProfileSta;
export { selectPoliceMenProfileStaDomain };
