import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the handleComplaints state domain
 */

const selectHandleComplaintsDomain = state => state.get('handleComplaints', initialState);

/**
 * Other specific selectors
 */

/**
 * Default selector used by HandleComplaints
 */

const makeSelectHandleComplaints = () => createSelector(
  selectHandleComplaintsDomain,
  substate => substate.toJS()
);

export default makeSelectHandleComplaints;
export { selectHandleComplaintsDomain };
