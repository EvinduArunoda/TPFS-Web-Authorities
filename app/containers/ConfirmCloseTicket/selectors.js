import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the confirmCloseTicket state domain
 */

const selectConfirmCloseTicketDomain = state => state.get('confirmCloseTicket', initialState);

/**
 * Other specific selectors
 */

/**
 * Default selector used by ConfirmCloseTicket
 */

const makeSelectConfirmCloseTicket = () => createSelector(
  selectConfirmCloseTicketDomain,
  substate => substate.toJS()
);

export default makeSelectConfirmCloseTicket;
export { selectConfirmCloseTicketDomain };
