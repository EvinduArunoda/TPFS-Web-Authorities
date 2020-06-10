import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { Field, reduxForm } from 'redux-form/immutable';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import ArrowForward from '@material-ui/icons/ArrowForward';
import { TextFieldRedux } from './ReduxFormMUI';
import styles from './user-jss';

// validation functions
const required = value => (value == null ? 'Required' : undefined);

const passwordsMatch = (value, allValues) => {
  if (value !== allValues.get('password')) {
    return 'Passwords dont match';
  }
  return undefined;
};

const LinkBtn = React.forwardRef(function LinkBtn(props, ref) { // eslint-disable-line
    return <NavLink to={props.to} {...props} innerRef={ref} />; // eslint-disable-line
});

// eslint-disable-next-line
class SetNewPasswordForm extends React.Component {

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
        deco
      } = this.props;
      return (
        <Fragment>

          <Paper className={classNames(classes.paperWrap, deco && classes.petal)}>

            <Typography variant="h4" className={classes.title} gutterBottom>
                        Set New Password
            </Typography>

            <section className={classes.formWrap}>
              <form onSubmit={handleSubmit}>
                <div>
                  <FormControl className={classes.formControl}>
                    <Field
                      name="password"
                      component={TextFieldRedux}
                      type="password"
                      label="Your Password"
                      required
                      validate={[required, passwordsMatch]}
                      className={classes.field}
                    />
                  </FormControl>
                </div>
                <div>
                  <FormControl className={classes.formControl}>
                    <Field
                      name="passwordConfirm"
                      component={TextFieldRedux}
                      type="password"
                      label="Re-type Password"
                      required
                      validate={[required, passwordsMatch]}
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

SetNewPasswordForm.propTypes = {
  classes: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  pristine: PropTypes.bool.isRequired,
  submitting: PropTypes.bool.isRequired,
  deco: PropTypes.bool.isRequired,
};

const SetNewPasswordFormReduxed = reduxForm({
  form: 'immutableExample',
  enableReinitialize: true,
})(SetNewPasswordForm);

const reducer = 'ui';
const SetNewPasswordFormMapped = connect(
  state => ({
    force: state,
    deco: state.getIn([reducer, 'decoration'])
  }),
)(SetNewPasswordFormReduxed);

export default withStyles(styles)(SetNewPasswordFormMapped);
