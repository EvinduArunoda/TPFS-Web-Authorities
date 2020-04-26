import React from 'react';
import { Helmet } from 'react-helmet';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import { createStructuredSelector } from 'reselect';
import { bindActionCreators, compose } from 'redux';
import { withStyles } from '@material-ui/core/styles';
import brand from 'dan-api/dummy/brand';
import styles from './user-jss';
import saga from './saga';
import reducer from './reducer';
import RegisterForm from '../../components/RegisterDriverForm';
import { registerDrivers } from './actions';
import makeSelectRegisterDrivers from './selectors';

class Register extends React.Component {
  state = {}

  // eslint-disable-next-line class-methods-use-this
  submitForm(values) {
    // eslint-disable-next-line react/destructuring-assignment
    this.props.registerDriver(values.get('email'), values.get('password'), values.get('name'), values.get('address'), values.get('phonenumber'), values.get('licenseNumber'));
    console.log(`You submitted:\n\n${values.get('name')}`); // eslint-disable-line
  }

  render() {
    const title = brand.name + ' - Register';
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
            <RegisterForm onSubmit={(values) => this.submitForm(values)} />
          </div>
        </div>
      </div>
    );
  }
}

Register.propTypes = {
  classes: PropTypes.object.isRequired,
  registerDriver: PropTypes.func.isRequired,
};
const mapStateToProps = createStructuredSelector({
  makeSelectRegisterDrivers: makeSelectRegisterDrivers()
});
const mapDispatchToProps = (dispatch) => ({
  registerDriver: bindActionCreators(registerDrivers, dispatch),
});
const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);
const withReducer = injectReducer({ key: 'registerDrivers', reducer });
const withSaga = injectSaga({ key: 'registerDrivers', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect
)(withStyles(styles)(Register));
