/**
 *
 * Login
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { bindActionCreators, compose } from 'redux';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import makeSelectLogin from './selectors';
import reducer from './reducer';
import saga from './saga';
import { login } from './actions';
import FormInit from '../../components/LoginForm';

// eslint-disable-next-line no-unused-vars
export function Login(props) {
  const submitForm = values => {
    props.loginAction(values.get('email'), values.get('password'));
  };

  return <FormInit onSubmit={values => submitForm(values)} />;
}

Login.propTypes = {
  // eslint-disable-next-line react/no-unused-prop-types
  loginAction: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  login: makeSelectLogin()
});

const mapDispatchToProps = (dispatch) => ({
  loginAction: bindActionCreators(login, dispatch),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);

const withReducer = injectReducer({ key: 'login', reducer });
const withSaga = injectSaga({ key: 'login', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect
)(Login);
