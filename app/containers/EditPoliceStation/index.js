/**
 *
 * EditPoliceStation
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import Grid from '@material-ui/core/Grid';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';
import Loading from 'dan-components/Loading';
import { bindActionCreators, compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';
import saga from './saga';
import reducer from './reducer';
import { COLLECTIONS } from '../../config/dbConstants';
import { assignPoliceStation } from './actions';
import { back } from '../PoliceMenProfileSta/actions';

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
function EditPoliceStation(props) {
  const {
    classes, webUsers, email, SubmitData, Submitting, Back
  } = props;

  if (!webUsers || Submitting) {
    return (<Loading />);
  }
  const policeStations = webUsers.filter(User => User.type === 'policeStation');

  console.log(email);
  const [station, setStation] = React.useState('');

  const handleOnChange1 = (event, value) => {
    console.log(value);
    setStation(value);
  };

  const handleSubmit = () => {
    SubmitData(email, station.station_id);
  };
  const handleSubmitBack = () => {
    Back();
  };

  return (
    <div>
      <Grid container spacing={3} alignItems="flex-start" direction="row" justify="center">
        <Grid item xs={12} md={6}>
          <Paper className={classes.root}>
            <div>
              <Autocomplete
                id="combo-box-policeStation"
                options={policeStations}
                getOptionLabel={(option) => option.station_id}
                className={classes.combo}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Select Police Station"
                    variant="outlined"
                    style={{ minWidth: 200 }}
                  />
                )}
                onChange={handleOnChange1}
              />
            </div>
            {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-noninteractive-element-interactions */}
            {station !== ''
              ? (
            // eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-noninteractive-element-interactions
                <form onClick={handleSubmit}>
                  <div className={classes.btnArea}>
                    <Button variant="contained" color="primary" type="button">
                  Continue
                    </Button>
                  </div>
                </form>
              ) : <div />}

            {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-noninteractive-element-interactions */}
            <form onClick={handleSubmitBack}>
              <div className={classes.btnArea}>
                <Button variant="contained" color="primary" type="button">
                  Go Back
                </Button>
              </div>
            </form>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}

EditPoliceStation.propTypes = {
  classes: PropTypes.object.isRequired,
  // eslint-disable-next-line react/require-default-props
  email: PropTypes.String,
  // eslint-disable-next-line react/require-default-props
  webUsers: PropTypes.array,
  // eslint-disable-next-line react/require-default-props
  SubmitData: PropTypes.function,
  // eslint-disable-next-line react/require-default-props
  Submitting: PropTypes.boolean,
  // eslint-disable-next-line react/require-default-props
  Back: PropTypes.function,
};

const RegReducer = 'PolicemanProfile';
const reducerFirestore = 'firestore';
const submittingRed = 'editPoliceStation';

const mapStateToProps = (state) => ({
  email: state.getIn([RegReducer, 'email']),
  webUsers: state.get(reducerFirestore).ordered[COLLECTIONS.USER],
  Submitting: state.getIn([submittingRed, 'submitting']),
});
const mapDispatchToProps = (dispatch) => ({
  SubmitData: bindActionCreators(assignPoliceStation, dispatch),
  Back: bindActionCreators(back, dispatch),
});
const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);

const withReducer = injectReducer({ key: 'editPoliceStation', reducer });
const withSaga = injectSaga({ key: 'editPoliceStation', saga });

export default compose(
  firestoreConnect(() => [
    { collection: COLLECTIONS.USER },
  ]),
  withReducer,
  withSaga,
  withConnect
)(withStyles(styles)(EditPoliceStation));
