/**
 *
 * ResetPassword
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators, compose } from 'redux';
import brand from 'dan-api/dummy/brand';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import { withStyles } from '@material-ui/core/styles';
import { Helmet } from 'react-helmet';
import SetNewPasswordForm from '../../components/Forms/SetNewPasswordForm';
import reducer from './reducer';
import saga from './saga';
import styles from '../../components/Forms/user-jss';
import { setPassword } from './actions';

/* eslint-disable react/prefer-stateless-function */
export class ResetPassword extends React.Component {
  state = {}

  submitForm(values) {
    // eslint-disable-next-line react/destructuring-assignment
    this.props.submitPassword(this.props.email, this.props.code, values.get('password'));
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
  // eslint-disable-next-line react/require-default-props
  email: PropTypes.string,
  // eslint-disable-next-line react/require-default-props
  code: PropTypes.string,
  // eslint-disable-next-line react/require-default-props
  submitPassword: PropTypes.func
};
const resetPasswordCodeReducer = 'resetPasswordCode';
const forgetPasswordReducer = 'ForgetPassword';

const mapStateToProps = (state) => ({
  email: state.getIn([forgetPasswordReducer, 'email']),
  code: state.getIn([resetPasswordCodeReducer, 'code'])
});


const mapDispatchToProps = (dispatch) => ({
  submitPassword: bindActionCreators(setPassword, dispatch),
});

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
