import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import { Field, reduxForm } from 'redux-form/immutable';
import Grid from '@material-ui/core/Grid';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import {
  TextFieldRedux,
} from 'dan-components/Forms/ReduxFormMUI';
import { bindActionCreators, compose } from 'redux';
import { flipRedirect } from '../HandleComplaints/actions';
// validation functions
const required = value => (value == null ? 'Required' : undefined);

const styles = theme => ({
  root: {
    flexGrow: 1,
    padding: 30
  },
  field: {
    width: '100%',
    marginBottom: 20
  },
  fieldBasic: {
    width: '100%',
    marginBottom: 20,
    marginTop: 10
  },
  inlineWrap: {
    display: 'flex',
    flexDirection: 'row'
  },
  buttonInit: {
    margin: theme.spacing(4),
    textAlign: 'center'
  },
});

class NotificationForm extends Component {
  render() {
    const trueBool = true;
    const {
      classes,
      handleSubmit,
      submitting,
      Back
    } = this.props;

    const handleBack = () => {
      Back();
    };

    return (
      <div>
        <Grid container spacing={3} alignItems="flex-start" direction="row" justify="center">
          <Grid item xs={12} md={6}>
            <Paper className={classes.root}>
              <form onSubmit={handleSubmit}>
                <div className={classes.field}>
                  <Field
                    name="FeedBack"
                    className={classes.field}
                    component={TextFieldRedux}
                    placeholder="FeedBack"
                    label="FeedBack"
                    multiline={trueBool}
                    validate={required}
                    rows={4}
                  />
                </div>
                <div>
                  <Button variant="contained" color="secondary" type="submit" disabled={submitting}>
                      Submit
                  </Button>
                </div>
              </form>
            </Paper>
            <div>
              To cancel the process :
            </div>
            <div>
              <Button variant="contained" color="secondary" type="submit" onClick={handleBack}>
                Go Back
              </Button>
            </div>
          </Grid>
        </Grid>
      </div>
    );
  }
}


NotificationForm.propTypes = {
  classes: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired,
  // eslint-disable-next-line react/require-default-props
  Back: PropTypes.func,
};
const mapStateToProps = () => ({
});
const mapDispatchToProps = (dispatch) => ({
  Back: bindActionCreators(flipRedirect, dispatch),
});
const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);
const ReduxFormMapped = reduxForm({
  form: 'immutableExample',
  enableReinitialize: true,
})(NotificationForm);

const reducer = 'complaintReducer';
const FormInit = connect(
  state => ({
    force: state,
    initialValues: state.getIn([reducer, 'formValues'])
  }),
)(ReduxFormMapped);

export default compose(
  withConnect
)(withStyles(styles)(FormInit));
