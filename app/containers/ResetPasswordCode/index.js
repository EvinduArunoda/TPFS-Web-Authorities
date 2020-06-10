/**
 *
 * ResetPasswordCode
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
// eslint-disable-next-line no-unused-vars
import { bindActionCreators, compose } from 'redux';
import brand from 'dan-api/dummy/brand';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import { withStyles } from '@material-ui/core/styles';
import { Helmet } from 'react-helmet';
import ResetForm from '../../components/Forms/ResetCodeForm';
import makeSelectResetPasswordCode from './selectors';
import reducer from './reducer';
import saga from './saga';
import styles from '../../components/Forms/user-jss';

/* eslint-disable react/prefer-stateless-function */
export class ResetPasswordCode extends React.Component {
  state = {
  }

  // submitForm(values) {
  //
  // }

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
  classes: PropTypes.object.isRequired

};

const mapStateToProps = createStructuredSelector({
  resetPasswordCode: makeSelectResetPasswordCode()
});

// eslint-disable-next-line no-unused-vars
const mapDispatchToProps = (dispatch) => ({
  // submitEmail: bindActionCreators(setEmail, dispatch),
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
