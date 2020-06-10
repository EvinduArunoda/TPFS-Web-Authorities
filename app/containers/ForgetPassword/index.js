/**
 *
 * ForgetPassword
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { bindActionCreators, compose } from 'redux';
import brand from 'dan-api/dummy/brand';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import { withStyles } from '@material-ui/core/styles';
import { Helmet } from 'react-helmet';
import ResetForm from '../../components/Forms/ResetForm';
import makeSelectForgetPassword from './selectors';
import reducer from './reducer';
import saga from './saga';
import styles from '../../components/Forms/user-jss';
import { setEmail } from './actions';

/* eslint-disable react/prefer-stateless-function */
export class ForgetPassword extends React.Component {
  state = {
  }

  submitForm(values) {
    // eslint-disable-next-line react/destructuring-assignment
    this.props.submitEmail(values.get('email'));
    console.log(values.get('email'));
  }

  render() {
    const title = brand.name + ' - Reset Password';
    const description = brand.desc;
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <Helmet>
          <title>{title}</title>
          <meta name="description" content={description} />
          <meta property="og:title" content={title} />
          <meta property="og:description" content={description} />
          <meta property="twitter:title" content={title} />
          <meta property="twitter:description" content={description} />
        </Helmet>
        <div className={classes.container}>
          <div className={classes.userFormWrap}>
            <ResetForm onSubmit={(values) => this.submitForm(values)} />
          </div>
        </div>
      </div>
    );
  }
}

ForgetPassword.propTypes = {
  // eslint-disable-next-line react/no-unused-prop-types,react/require-default-props
  dispatch: PropTypes.func,
  classes: PropTypes.object.isRequired,
  // eslint-disable-next-line react/require-default-props
  submitEmail: PropTypes.func
};

const mapStateToProps = createStructuredSelector({
  forgetPassword: makeSelectForgetPassword()
});

const mapDispatchToProps = (dispatch) => ({
  submitEmail: bindActionCreators(setEmail, dispatch),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);

const withReducer = injectReducer({ key: 'forgetPassword', reducer });
const withSaga = injectSaga({ key: 'forgetPassword', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect
)(withStyles(styles)(ForgetPassword));
