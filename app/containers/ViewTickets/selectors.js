import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the viewTickets state domain
 */

const selectViewTicketsDomain = state => state.get('viewTickets', initialState);

/**
 * Other specific selectors
 */

/**
 * Default selector used by ViewTickets
 */

const makeSelectViewTickets = () => createSelector(
  selectViewTicketsDomain,
  substate => substate.toJS()
);

export default makeSelectViewTickets;
export { selectViewTicketsDomain };
