/**
 *
 * ResetPasswordCode
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
import ResetForm from '../../components/Forms/ResetCodeForm';
import reducer from './reducer';
import saga from './saga';
import styles from '../../components/Forms/user-jss';
import { setCode } from './actions';

/* eslint-disable react/prefer-stateless-function */
export class ResetPasswordCode extends React.Component {
  state = {}

  submitForm(values) {
    // eslint-disable-next-line react/destructuring-assignment
    this.props.submitCode(values.get('code'), this.props.email);
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

ResetPasswordCode.propTypes = {
  // eslint-disable-next-line react/no-unused-prop-types,react/require-default-props
  dispatch: PropTypes.func,
  classes: PropTypes.object.isRequired,
  // eslint-disable-next-line react/require-default-props
  email: PropTypes.string,
  // eslint-disable-next-line react/require-default-props
  submitCode: PropTypes.func

};

const forgetPasswordReducer = 'ForgetPassword';

const mapStateToProps = (state) => ({
  email: state.getIn([forgetPasswordReducer, 'email'])
});

const mapDispatchToProps = (dispatch) => ({
  submitCode: bindActionCreators(setCode, dispatch),
});

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
)(withStyles(styles)(ResetPasswordCode));
