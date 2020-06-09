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
import FormControl from '@material-ui/core/FormControl';
import saga from './saga';
import reducer from './reducer';
import { COLLECTIONS } from '../../config/dbConstants';
import { submitData } from './actions';

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

function DriverSecondaryReg(props) {
  const {
    classes, configs, email, SubmitData, Submitting
  } = props;

  if (!configs || Submitting) {
    return (<Loading />);
  }
  const physicalDisabilities = configs.filter(Config => Config.id === 'physical_disabilities');
  const disabilitiyList = physicalDisabilities[0].physicalDisabilities;

  const driverClasses = configs.filter(Config => Config.id === 'driver_Classes');
  const driverClassList = driverClasses[0].driverClasses;
  console.log(email);
  const [Class, setClass] = React.useState([]);
  const [Disabilities, setDisabilities] = React.useState([]);

  const handleOnChange1 = (event, value) => {
    console.log(value);
    setClass(value);
  };
  const handleOnChange2 = (event, value) => {
    console.log(value);
    setDisabilities(value);
  };
  const handleSubmit = () => {
    SubmitData(email, Disabilities, Class);
  };

  return (
    <div>
      <Grid container spacing={3} alignItems="flex-start" direction="row" justify="center">
        <Grid item xs={12} md={6}>
          <Paper className={classes.root}>
            <FormControl variant="outlined" className={classes.formControl}>
              <div className={classes.rootAutoComp}>
                <Autocomplete
                  name="physical disabilities"
                  multiple
                  id="tags-outlined"
                  options={disabilitiyList}
                  getOptionLabel={(option) => option.inWord}
                  filterSelectedOptions
                  onChange={handleOnChange2}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      value={params}
                      variant="outlined"
                      label="physicalDisabilities"
                      placeholder="Select Disabilities"
                      style={{ minWidth: 200 }}
                    />
                  )}
                />
              </div>
            </FormControl>
            <FormControl variant="outlined" className={classes.formControl}>
              <div>
                <Autocomplete
                  id="combo-box-policeStation"
                  options={driverClassList}
                  getOptionLabel={(option) => option.inWord}
                  className={classes.combo}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Select Driver Class"
                      variant="outlined"
                      style={{ minWidth: 200 }}
                    />
                  )}
                  onChange={handleOnChange1}
                />
              </div>
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


DriverSecondaryReg.propTypes = {
  classes: PropTypes.object.isRequired,
  // eslint-disable-next-line react/require-default-props
  email: PropTypes.String,
  // eslint-disable-next-line react/require-default-props
  configs: PropTypes.array,
  // eslint-disable-next-line react/require-default-props
  SubmitData: PropTypes.function,
  // eslint-disable-next-line react/require-default-props
  Submitting: PropTypes.boolean

};

const RegReducer = 'regDriver';
const reducerFirestore = 'firestore';
const regDriverSecReducer = 'regDriverSec';

const mapStateToProps = (state) => ({
  email: state.getIn([RegReducer, 'email']),
  Submitting: state.getIn([regDriverSecReducer, 'Submitting']),
  configs: state.get(reducerFirestore).ordered[COLLECTIONS.CONFIG],
});
const mapDispatchToProps = (dispatch) => ({
  SubmitData: bindActionCreators(submitData, dispatch),
});
const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);
const withReducer = injectReducer({ key: 'regDriverSecondary', reducer });
const withSaga = injectSaga({ key: 'regDriverSecondary', saga });

export default compose(
  firestoreConnect(() => [
    { collection: COLLECTIONS.CONFIG },
  ]),
  withReducer,
  withSaga,
  withConnect
)(withStyles(styles)(DriverSecondaryReg));
