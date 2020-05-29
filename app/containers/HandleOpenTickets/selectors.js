import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the handleOpenTickets state domain
 */

const selectHandleOpenTicketsDomain = state => state.get('handleOpenTickets', initialState);

/**
 * Other specific selectors
 */

/**
 * Default selector used by HandleOpenTickets
 */

const makeSelectHandleOpenTickets = () => createSelector(
  selectHandleOpenTicketsDomain,
  substate => substate.toJS()
);

export default makeSelectHandleOpenTickets;
export { selectHandleOpenTicketsDomain };
