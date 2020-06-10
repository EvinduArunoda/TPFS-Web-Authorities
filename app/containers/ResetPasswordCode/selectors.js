import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the resetPasswordCode state domain
 */

const selectResetPasswordCodeDomain = state => state.get('resetPasswordCode', initialState);

/**
 * Other specific selectors
 */

/**
 * Default selector used by ResetPasswordCode
 */

const makeSelectResetPasswordCode = () => createSelector(
  selectResetPasswordCodeDomain,
  substate => substate.toJS()
);

export default makeSelectResetPasswordCode;
export { selectResetPasswordCodeDomain };
