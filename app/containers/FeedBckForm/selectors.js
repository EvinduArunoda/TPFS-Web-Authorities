import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the feedBckForm state domain
 */

const selectFeedBckFormDomain = state => state.get('feedBckForm', initialState);

/**
 * Other specific selectors
 */

/**
 * Default selector used by FeedBckForm
 */

const makeSelectFeedBckForm = () => createSelector(
  selectFeedBckFormDomain,
  substate => substate.toJS()
);

export default makeSelectFeedBckForm;
export { selectFeedBckFormDomain };
