/**
 *
 * ChangePassword
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators, compose } from 'redux';
import { withStyles } from '@material-ui/core/styles';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import saga from './saga';
import reducer from './reducer';
import { setEmail } from '../ForgetPassword/actions';
import { submitEmail } from './actions';


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
  combo: {
    width: 300
  },
  btnArea: {
    display: 'flex',
    justifyContent: 'space-around',
    margin: `${theme.spacing(2)}px 0`,
    fontSize: 12,
    '& $label': {
      fontSize: 12,
      '& span': {
        fontSize: 12
      }
    },
    '& button': {
      margin: `0 ${theme.spacing(1)}px`
    },
    [theme.breakpoints.down('xs')]: {
      flexDirection: 'column',
      '& button': {
        width: '100%',
        margin: 5
      }
    },
  },
});

/* eslint-disable react/prefer-stateless-function */
export class ChangePassword extends React.Component {
  render() {
    const {
      classes, auth, SubmitEmail, sagaFunc
    } = this.props;

    const handleSubmit = () => {
      SubmitEmail(auth.email);
      sagaFunc(auth.email);
    };
    return (
      <div>
        <Grid container spacing={3} alignItems="flex-start" direction="row" justify="center">
          <Grid item xs={12} md={6}>
            <Paper className={classes.root}>
              <Typography variant="h6" className={classes.title} gutterBottom>
                Continue to get the verification code to your email address
              </Typography>
              {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-noninteractive-element-interactions */}
              <form onClick={handleSubmit}>
                <div className={classes.btnArea}>
                  <Button variant="contained" color="primary" type="button">
                  Send Code
                  </Button>
                </div>
              </form>
            </Paper>
          </Grid>
        </Grid>
      </div>
    );
  }
}

ChangePassword.propTypes = {
  auth: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  // eslint-disable-next-line react/require-default-props,react/no-unused-prop-types
  dispatch: PropTypes.func,
  // eslint-disable-next-line react/require-default-props
  SubmitEmail: PropTypes.func,
  // eslint-disable-next-line react/require-default-props
  sagaFunc: PropTypes.func
};

const mapStateToProps = (state) => ({
  auth: state.getIn(['firebase']).auth,
});

const mapDispatchToProps = (dispatch) => ({
  SubmitEmail: bindActionCreators(setEmail, dispatch),
  sagaFunc: bindActionCreators(submitEmail, dispatch),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);

const withReducer = injectReducer({ key: 'changePassword', reducer });
const withSaga = injectSaga({ key: 'changePassword', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect
)(withStyles(styles)(ChangePassword));
