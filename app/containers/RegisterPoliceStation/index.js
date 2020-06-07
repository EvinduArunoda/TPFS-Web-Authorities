import React from 'react';
import { Helmet } from 'react-helmet';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import { bindActionCreators, compose } from 'redux';
import { withStyles } from '@material-ui/core/styles';
import brand from 'dan-api/dummy/brand';
import styles from './user-jss';
import saga from './saga';
import reducer from './reducer';
import RegisterForm from '../../components/RegisterPoliceStationForm';
import { registerPoliceStation } from './actions';

class Register extends React.Component {
  state = {}

  // eslint-disable-next-line class-methods-use-this
  submitForm(values) {
    // eslint-disable-next-line react/destructuring-assignment
    this.props.registerPoliceStation(values.get('email'), values.get('region'), values.get('stationID'), values.get('phonenumber'), values.get('address'), this.props.auth.email);
    console.log(`You submitted:\n\n${values.get('email')}`); // eslint-disable-line
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
  registerPoliceStation: PropTypes.func.isRequired,
  // eslint-disable-next-line react/require-default-props
  auth: PropTypes.object
};
const mapStateToProps = (state) => ({
  auth: state.getIn(['firebase']).auth,
});
const mapDispatchToProps = (dispatch) => ({
  registerPoliceStation: bindActionCreators(registerPoliceStation, dispatch),
});
const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);
const withReducer = injectReducer({ key: 'registerPoliceStation', reducer });
const withSaga = injectSaga({ key: 'registerPoliceStation', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect
)(withStyles(styles)(Register));
