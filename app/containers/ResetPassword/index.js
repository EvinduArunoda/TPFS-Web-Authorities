/**
 *
 * ResetPassword
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import makeSelectResetPassword from './selectors';
import reducer from './reducer';
import saga from './saga';

/* eslint-disable react/prefer-stateless-function */
export class ResetPassword extends React.Component {
  render() {
    return <div />;
  }
}

ResetPassword.propTypes = {
  // eslint-disable-next-line react/no-unused-prop-types
  dispatch: PropTypes.func.isRequired
};

const mapStateToProps = createStructuredSelector({
  resetPassword: makeSelectResetPassword()
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

const withReducer = injectReducer({ key: 'resetPassword', reducer });
const withSaga = injectSaga({ key: 'resetPassword', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect
)(ResetPassword);
