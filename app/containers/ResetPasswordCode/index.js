/**
 *
 * ResetPasswordCode
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import makeSelectResetPasswordCode from './selectors';
import reducer from './reducer';
import saga from './saga';

/* eslint-disable react/prefer-stateless-function */
export class ResetPasswordCode extends React.Component {
  render() {
    return <div />;
  }
}

ResetPasswordCode.propTypes = {
  // eslint-disable-next-line react/no-unused-prop-types
  dispatch: PropTypes.func.isRequired
};

const mapStateToProps = createStructuredSelector({
  resetPasswordCode: makeSelectResetPasswordCode()
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

const withReducer = injectReducer({ key: 'resetPasswordCode', reducer });
const withSaga = injectSaga({ key: 'resetPasswordCode', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect
)(ResetPasswordCode);
