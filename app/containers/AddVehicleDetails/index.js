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
import FormControl from '@material-ui/core/FormControl';
import Loading from 'dan-components/Loading';
import { bindActionCreators, compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';
import saga from './saga';
import reducer from './reducer';
import { COLLECTIONS } from '../../config/dbConstants';
import { submitData } from './actions';

const styles = theme => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
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

function AddVehicleDetails(props) {
  const {
    classes, configs, LicensePlate, SubmitData, Submitting
  } = props;

  if (!configs || Submitting) {
    return (<Loading />);
  }
  const vehicleConditions = configs.filter(Config => Config.id === 'vehicle_conditions');
  const vehicleConditionList = vehicleConditions[0].vehicleConditions;

  const vehicleClasses = configs.filter(Config => Config.id === 'vehicle_Classes');
  const vehicleClassesList = vehicleClasses[0].vehicleClasses;
  console.log(LicensePlate);

  const [Class, setClass] = React.useState([]);
  const [VehicleConditions, setVehicleConditions] = React.useState([]);

  const handleOnChange1 = (event, value) => {
    console.log(value);
    setClass(value);
  };
  const handleOnChange2 = (event, value) => {
    console.log(value);
    setVehicleConditions(value);
  };
  const handleSubmit = () => {
    SubmitData(LicensePlate, VehicleConditions, Class);
  };

  return (
    <div>
      <Grid container spacing={3} alignItems="flex-start" direction="row" justify="center">
        <Grid item xs={12} md={6}>
          <Paper className={classes.root}>
            <FormControl variant="outlined" className={classes.formControl}>

              <Autocomplete
                name="vehicle conditions"
                multiple
                id="tags-outlined"
                options={vehicleConditionList}
                getOptionLabel={(option) => option.inWord}
                filterSelectedOptions
                onChange={handleOnChange2}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    value={params}
                    variant="outlined"
                    label="vehicleConditions"
                    placeholder="Select Vehicle Conditions"
                    style={{ minWidth: 200 }}
                  />
                )}
              />
            </FormControl>
            <FormControl variant="outlined" className={classes.formControl}>
              <Autocomplete
                id="combo-box-policeStation"
                options={vehicleClassesList}
                getOptionLabel={(option) => option.inWord}
                className={classes.combo}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Select Vehicle Class"
                    variant="outlined"
                    style={{ minWidth: 200 }}
                  />
                )}
                onChange={handleOnChange1}
              />
            </FormControl>
            {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-noninteractive-element-interactions */}
            <form onClick={handleSubmit}>
              <div className={classes.btnArea}>
                <Button variant="contained" color="primary" type="button">
                    Continue
                </Button>
              </div>
            </form>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}


AddVehicleDetails.propTypes = {
  classes: PropTypes.object.isRequired,
  // eslint-disable-next-line react/require-default-props
  LicensePlate: PropTypes.String,
  // eslint-disable-next-line react/require-default-props
  configs: PropTypes.array,
  // eslint-disable-next-line react/require-default-props
  SubmitData: PropTypes.function,
  // eslint-disable-next-line react/require-default-props
  Submitting: PropTypes.boolean
};

const RegReducer = 'regVehicle';
const addVehicleDetailsReducer = 'addVehicleDetails';
const reducerFirestore = 'firestore';

const mapStateToProps = (state) => ({
  LicensePlate: state.getIn([RegReducer, 'LicensePlate']),
  Submitting: state.getIn([addVehicleDetailsReducer, 'Submitting']),
  configs: state.get(reducerFirestore).ordered[COLLECTIONS.CONFIG],
});
const mapDispatchToProps = (dispatch) => ({
  SubmitData: bindActionCreators(submitData, dispatch),
});
const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);
const withReducer = injectReducer({ key: 'addVehicleDetails', reducer });
const withSaga = injectSaga({ key: 'addVehicleDetails', saga });

export default compose(
  firestoreConnect(() => [
    { collection: COLLECTIONS.CONFIG },
  ]),
  withReducer,
  withSaga,
  withConnect
)(withStyles(styles)(AddVehicleDetails));
