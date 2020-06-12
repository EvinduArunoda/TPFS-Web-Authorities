import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form/immutable';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import ArrowForward from '@material-ui/icons/ArrowForward';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { TextFieldRedux } from './ReduxFormMUI';
import styles from './user-jss';

// validation functions
const required = value => (value == null ? 'Required' : undefined);

class RegionalRuleForm extends React.Component {
  render() {
    const {
      classes,
      handleSubmit,
      pristine,
      submitting,
      deco,
    } = this.props;
    const trueBool = true;
    return (
      <Paper className={classNames(classes.paperWrap, deco && classes.petal)}>
        <Typography variant="h4" className={classes.title} gutterBottom>
                    New Regional Rule
        </Typography>
        <Typography variant="caption" className={classes.subtitle} gutterBottom align="center">
                    Enter the Title and Description
        </Typography>
        <section className={classes.formWrap}>
          <form onSubmit={handleSubmit}>
            <div>
              <FormControl className={classes.formControl}>
                <Field
                  name="title"
                  component={TextFieldRedux}
                  placeholder="Title"
                  label="Title"
                  required
                  validate={[required]}
                  className={classes.field}
                />
              </FormControl>
            </div>
            <div className={classes.field}>
              <Field
                name="description"
                className={classes.field}
                component={TextFieldRedux}
                placeholder="Description"
                label="Description"
                multiline={trueBool}
                validate={required}
                rows={4}
                style={{ minWidth: 900 }}
              />
            </div>
            <div className={classes.btnArea}>
              <Button variant="contained" color="primary" type="submit">
                                Submit
                <ArrowForward className={classNames(classes.rightIcon, classes.iconSmall)} disabled={submitting || pristine} />
              </Button>
            </div>
          </form>
        </section>
      </Paper>
    );
  }
}

RegionalRuleForm.propTypes = {
  classes: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  pristine: PropTypes.bool.isRequired,
  submitting: PropTypes.bool.isRequired,
  deco: PropTypes.bool.isRequired,
};

const RegionalRuleFormReduxed = reduxForm({
  form: 'immutableEResetFrm',
  enableReinitialize: true,
})(RegionalRuleForm);

const reducer = 'ui';
const RegionalRuleFormMapped = connect(
  state => ({
    force: state,
    deco: state.getIn([reducer, 'decoration'])
  }),
)(RegionalRuleFormReduxed);

export default withStyles(styles)(RegionalRuleFormMapped);
