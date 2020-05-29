import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the enterPaymentDetails state domain
 */

const selectEnterPaymentDetailsDomain = state => state.get('enterPaymentDetails', initialState);

/**
 * Other specific selectors
 */

/**
 * Default selector used by EnterPaymentDetails
 */

const makeSelectEnterPaymentDetails = () => createSelector(
  selectEnterPaymentDetailsDomain,
  substate => substate.toJS()
);

export default makeSelectEnterPaymentDetails;
export { selectEnterPaymentDetailsDomain };
