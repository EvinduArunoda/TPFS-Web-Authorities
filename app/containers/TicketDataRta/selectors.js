import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the ticketDataRta state domain
 */

const selectTicketDataRtaDomain = state => state.get('ticketDataRta', initialState);

/**
 * Other specific selectors
 */

/**
 * Default selector used by TicketDataRta
 */

const makeSelectTicketDataRta = () => createSelector(
  selectTicketDataRtaDomain,
  substate => substate.toJS()
);

export default makeSelectTicketDataRta;
export { selectTicketDataRtaDomain };
