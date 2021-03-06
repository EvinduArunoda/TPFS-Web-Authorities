import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Loading from 'dan-components/Loading';
import { bindActionCreators, compose } from 'redux';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import { Field, reduxForm } from 'redux-form/immutable';
import Grid from '@material-ui/core/Grid';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import {
  TextFieldRedux,
} from 'dan-components/Forms/ReduxFormMUI';
import FormControl from '@material-ui/core/FormControl';
import { back } from '../HandleOpenTickets/actions';

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
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
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

class EnterPayementDetails extends Component {
  render() {
    const {
      classes,
      handleSubmit,
      submitting,
      Back,
      loading
    } = this.props;
    if (loading) {
      return (<Loading />);
    }
    const handleBack = () => {
      Back();
    };

    return (
      <div>
        <Grid container spacing={3} alignItems="flex-start" direction="row" justify="center">
          <Grid item xs={12} md={6}>
            <Paper className={classes.root}>
              <form onSubmit={handleSubmit}>
                <div>
                  <FormControl className={classes.formControl}>
                    <Field
                      name="receiptNo"
                      component={TextFieldRedux}
                      placeholder="Receipt Number"
                      label="Receipt Number"
                      required
                      validate={required}
                      className={classes.field}
                    />
                  </FormControl>
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


EnterPayementDetails.propTypes = {
  classes: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired,
  // eslint-disable-next-line react/require-default-props
  Back: PropTypes.func,
  // eslint-disable-next-line react/require-default-props
  loading: PropTypes.boolean,
};
const submitPaymentReducer = 'submitPayment';

const mapStateToProps = (state) => ({
  loading: state.getIn([submitPaymentReducer, 'loading']),
});
const mapDispatchToProps = (dispatch) => ({
  Back: bindActionCreators(back, dispatch),
});
const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);
const ReduxFormMapped = reduxForm({
  form: 'immutableExample',
  enableReinitialize: true,
})(EnterPayementDetails);

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
