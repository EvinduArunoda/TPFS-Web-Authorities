import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the viewTicketsRta state domain
 */

const selectViewTicketsRtaDomain = state => state.get('viewTicketsRta', initialState);

/**
 * Other specific selectors
 */

/**
 * Default selector used by ViewTicketsRta
 */

const makeSelectViewTicketsRta = () => createSelector(
  selectViewTicketsRtaDomain,
  substate => substate.toJS()
);

export default makeSelectViewTicketsRta;
export { selectViewTicketsRtaDomain };
