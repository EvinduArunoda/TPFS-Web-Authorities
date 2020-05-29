import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the submitPaymentDetails state domain
 */

const selectSubmitPaymentDetailsDomain = state => state.get('submitPaymentDetails', initialState);

/**
 * Other specific selectors
 */

/**
 * Default selector used by SubmitPaymentDetails
 */

const makeSelectSubmitPaymentDetails = () => createSelector(
  selectSubmitPaymentDetailsDomain,
  substate => substate.toJS()
);

export default makeSelectSubmitPaymentDetails;
export { selectSubmitPaymentDetailsDomain };
