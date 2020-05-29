/**
 *
 * SubmitPaymentDetails
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import makeSelectSubmitPaymentDetails from './selectors';
import reducer from './reducer';
import saga from './saga';

/* eslint-disable react/prefer-stateless-function */
export class SubmitPaymentDetails extends React.Component {
  render() {
    return <div />;
  }
}

SubmitPaymentDetails.propTypes = {
  // eslint-disable-next-line react/no-unused-prop-types
  dispatch: PropTypes.func.isRequired
};

const mapStateToProps = createStructuredSelector({
  submitPaymentDetails: makeSelectSubmitPaymentDetails()
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

const withReducer = injectReducer({ key: 'submitPaymentDetails', reducer });
const withSaga = injectSaga({ key: 'submitPaymentDetails', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect
)(SubmitPaymentDetails);
