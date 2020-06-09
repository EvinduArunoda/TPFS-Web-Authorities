import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the ticketData state domain
 */

const selectTicketDataDomain = state => state.get('ticketData', initialState);

/**
 * Other specific selectors
 */

/**
 * Default selector used by TicketData
 */

const makeSelectTicketData = () => createSelector(
  selectTicketDataDomain,
  substate => substate.toJS()
);

export default makeSelectTicketData;
export { selectTicketDataDomain };
