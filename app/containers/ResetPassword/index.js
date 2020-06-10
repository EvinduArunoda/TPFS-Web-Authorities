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
import brand from 'dan-api/dummy/brand';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import { withStyles } from '@material-ui/core/styles';
import { Helmet } from 'react-helmet';
import SetNewPasswordForm from '../../components/Forms/SetNewPasswordForm';
import makeSelectResetPassword from './selectors';
import reducer from './reducer';
import saga from './saga';
import styles from '../../components/Forms/user-jss';

/* eslint-disable react/prefer-stateless-function */
export class ResetPassword extends React.Component {
  state = {
    valueForm: []
  }

  submitForm(values) {
    setTimeout(() => {
      this.setState({ valueForm: values });
      console.log(`You submitted:\n\n${this.state.valueForm}`); // eslint-disable-line
    }, 500); // simulate server latency
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
            <SetNewPasswordForm onSubmit={(values) => this.submitForm(values)} />
          </div>
        </div>
      </div>
    );
  }
}

ResetPassword.propTypes = {
  // eslint-disable-next-line react/no-unused-prop-types
  dispatch: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,

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
)(withStyles(styles)(ResetPassword));
