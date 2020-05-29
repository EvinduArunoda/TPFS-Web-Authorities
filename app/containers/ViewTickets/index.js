/**
 *
 * ViewTickets
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import makeSelectViewTickets from './selectors';
import reducer from './reducer';
import saga from './saga';

/* eslint-disable react/prefer-stateless-function */
export class ViewTickets extends React.Component {
  render() {
    return <div />;
  }
}

ViewTickets.propTypes = {
  // eslint-disable-next-line react/no-unused-prop-types
  dispatch: PropTypes.func.isRequired
};

const mapStateToProps = createStructuredSelector({
  viewTickets: makeSelectViewTickets()
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);

const withReducer = injectReducer({ key: 'viewTickets', reducer });
const withSaga = injectSaga({ key: 'viewTickets', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect
)(ViewTickets);
