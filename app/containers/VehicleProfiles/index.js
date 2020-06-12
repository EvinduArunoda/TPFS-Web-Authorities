import React from 'react';
import { Helmet } from 'react-helmet';
import brand from 'dan-api/dummy/brand';
import PropTypes from 'prop-types';
import { PapperBlock } from 'dan-components';
import { withStyles } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import SecurityIcon from '@material-ui/icons/Security';
import NoteAddIcon from '@material-ui/icons/NoteAdd';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { compose } from 'redux';
import { firestoreConnect, withFirebase } from 'react-redux-firebase';
import Loading from 'dan-components/Loading';
import { connect } from 'react-redux';
import { COLLECTIONS } from '../../config/dbConstants';
import styles from './profile-jss';

function VehicleProfile(props) {
  // let policeStation = 'Default';
  const {
    classes, auth, vehicles
  } = props;
  if (!auth || !vehicles) {
    return (<Loading />);
  }
  const [vehicle, setVehicle] = React.useState('Default');

  const [insuranceNumber, setInsuranceNumber] = React.useState('  ');
  const [licensePlate, setlicensePlate] = React.useState('  ');
  const [makeModel, setmakeModel] = React.useState('  ');
  const [regNo, setRegNo] = React.useState('  ');
  const [owner, setOwner] = React.useState('  ');

  const vehicleList = vehicles.map(Vehicle => ({ licensePlate: Vehicle.LicensePlate }));

  const handleStationChange = (event, value) => {
    setVehicle(value);
    console.log(vehicle);
    const selVehicle = vehicles.filter(user => user.LicensePlate === value.licensePlate)[0];
    console.log(selVehicle);
    setInsuranceNumber(selVehicle.insuranceNumber);
    setlicensePlate(selVehicle.LicensePlate);
    setmakeModel(selVehicle.makeAndModel);
    setRegNo(selVehicle.registeredNumber);
    setOwner(selVehicle.ownerID);
  };

  const title = brand.name + ' - Vehicle Profiles';
  const description = brand.desc;
  return (
    <div>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="twitter:title" content={title} />
        <meta property="twitter:description" content={description} />
      </Helmet>
      <PapperBlock title="Select Vehicle" desc="Select the vehicle">
        <Autocomplete
          id="combo-box-policeStation"
          options={vehicleList}
          getOptionLabel={(option) => option.licensePlate}
          className={classes.combo}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Select vehicle"
              variant="outlined"
              style={{ minWidth: 200 }}
            />
          )}
          onChange={handleStationChange}
        />
      </PapperBlock>
      {licensePlate !== '  '
        ? (
          <PapperBlock title={licensePlate} icon="ios-car-outline" whiteBg noMargin desc={makeModel}>
            <Divider className={classes.divider} />
            <List dense className={classes.profileList}>
              <ListItem>
                <ListItemAvatar>
                  <Avatar>
                    <AccountCircleIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary="Owner NIC" secondary={owner} />
              </ListItem>
              <ListItem>
                <ListItemAvatar>
                  <Avatar>
                    <NoteAddIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary="Registered Number" secondary={regNo} />
              </ListItem>
              <ListItem>
                <ListItemAvatar>
                  <Avatar>
                    <SecurityIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary="Insurance Number" secondary={insuranceNumber} />
              </ListItem>
            </List>
          </PapperBlock>
        ) : <div />}
    </div>
  );
}

const reducerFirestore = 'firestore';

VehicleProfile.propTypes = {
  classes: PropTypes.object.isRequired,
  // eslint-disable-next-line react/require-default-props
  auth: PropTypes.object,
  // eslint-disable-next-line react/require-default-props
  vehicles: PropTypes.array,
};

const mapStateToProps = (state) => ({
  auth: state.getIn(['firebase']).auth,
  vehicles: state.get(reducerFirestore).ordered[COLLECTIONS.VEHICLE],
});
export default compose(
  firestoreConnect(() => [
    { collection: COLLECTIONS.VEHICLE },
  ]),
  connect(
    mapStateToProps,
  ))(withStyles(styles)(withFirebase(VehicleProfile)));
