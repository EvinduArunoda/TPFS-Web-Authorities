import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import Loading from 'dan-components/Loading';
import { Field, reduxForm } from 'redux-form/immutable';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
// import FormControlLabel from '@material-ui/core/FormControlLabel';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import ArrowForward from '@material-ui/icons/ArrowForward';
import { TextFieldRedux } from './ReduxFormMUI';
import styles from './user-jss';

// validation functions
const required = value => (value == null ? 'Required' : undefined);

const LinkBtn = React.forwardRef(function LinkBtn(props, ref) { // eslint-disable-line
  return <NavLink to={props.to} {...props} innerRef={ref} />; // eslint-disable-line
});

// eslint-disable-next-line
class Index extends React.Component {

  handleClickShowPassword = () => {
    const { showPassword } = this.state;
    this.setState({ showPassword: !showPassword });
  };

  handleMouseDownPassword = event => {
    event.preventDefault();
  };


  render() {
    const {
      classes,
      handleSubmit,
      pristine,
      submitting,
      deco,
      Submitting
    } = this.props;
    if (Submitting) {
      return (<Loading />);
    }
    return (
      <Fragment>

        <Paper className={classNames(classes.paperWrap, deco && classes.petal)}>

          <Typography variant="h4" className={classes.title} gutterBottom>
            Enter Details
          </Typography>

          <section className={classes.formWrap}>
            <form onSubmit={handleSubmit}>
              <div>
                <FormControl className={classes.formControl}>
                  <Field
                    name="LicensePlate"
                    component={TextFieldRedux}
                    placeholder="License Plate Number"
                    label="License Plate Number"
                    required
                    validate={[required]}
                    className={classes.field}
                  />
                </FormControl>
              </div>
              <div>
                <FormControl className={classes.formControl}>
                  <Field
                    name="insuranceNumber"
                    component={TextFieldRedux}
                    placeholder="Insurance Number"
                    label="Insurance Number"
                    required
                    validate={[required]}
                    className={classes.field}
                  />
                </FormControl>
              </div>
              <div>
                <FormControl className={classes.formControl}>
                  <Field
                    name="makeAndModel"
                    component={TextFieldRedux}
                    placeholder="Make And Model"
                    label="Make And Model"
                    required
                    className={classes.field}
                  />
                </FormControl>
              </div>
              <div>
                <FormControl className={classes.formControl}>
                  <Field
                    name="registeredNumber"
                    component={TextFieldRedux}
                    placeholder="Registered Number"
                    label="Registered Number"
                    required
                    validate={[required]}
                    className={classes.field}
                  />
                </FormControl>
              </div>
              <div>
                <FormControl className={classes.formControl}>
                  <Field
                    name="registeredOwner"
                    component={TextFieldRedux}
                    placeholder="Registered Owner"
                    label="Registered Owner"
                    required
                    validate={[required]}
                    className={classes.field}
                  />
                </FormControl>
              </div>
              <div>
                <FormControl className={classes.formControl}>
                  <Field
                    name="ownerID"
                    component={TextFieldRedux}
                    placeholder="Owner NIC"
                    label="Owner NIC"
                    required
                    validate={[required]}
                    className={classes.field}
                  />
                </FormControl>
              </div>
              <div className={classes.btnArea}>
                <Button variant="contained" color="primary" type="submit">
                    Continue
                  <ArrowForward className={classNames(classes.rightIcon, classes.iconSmall)} disabled={submitting || pristine} />
                </Button>
              </div>
            </form>
          </section>

        </Paper>
      </Fragment>
    );
  }
}

Index.propTypes = {
  classes: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  pristine: PropTypes.bool.isRequired,
  submitting: PropTypes.bool.isRequired,
  deco: PropTypes.bool.isRequired,
  // eslint-disable-next-line react/require-default-props
  Submitting: PropTypes.bool
};

const RegisterFormReduxed = reduxForm({
  form: 'immutableExample',
  enableReinitialize: true,
})(Index);

const reducer = 'ui';
const regVehicleReducer = 'regVehicle';
const RegisterFormMapped = connect(
  state => ({
    force: state,
    deco: state.getIn([reducer, 'decoration']),
    Submitting: state.getIn([regVehicleReducer, 'Submitting']),
  }),
)(RegisterFormReduxed);

export default withStyles(styles)(RegisterFormMapped);
