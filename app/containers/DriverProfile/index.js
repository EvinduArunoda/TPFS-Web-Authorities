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
// import firestore from '../../config/firebaseConfig';

function DriverProfile(props) {
  // let policeStation = 'Default';
  const {
    classes, auth, drivers
  } = props;
  if (!auth || !drivers) {
    return (<Loading />);
  }
  const [driver, setDriver] = React.useState('Default');

  const [licenseNumber, setlicenseNumber] = React.useState('  ');
  const [NIC, setNIC] = React.useState('  ');
  const [name, setName] = React.useState('  ');
  const [category, setcategory] = React.useState('  ');
  const [address, setaddress] = React.useState('  ');

  const driverList = drivers.map(Driver => ({ NIC: Driver.NIC }));

  const handleStationChange = (event, value) => {
    setDriver(value);
    console.log(driver);
    const selDriver = drivers.filter(user => user.NIC === value.NIC)[0];
    console.log(selDriver);
    setaddress(selDriver.address);
    setlicenseNumber(selDriver.LicenseNumber);
    setNIC(selDriver.NIC);
    setcategory(selDriver.Class);
    setName(selDriver.name);
  };

  const title = brand.name + ' - Driver Profiles';
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
      <PapperBlock title="Select Driver" desc="Select the driver">
        <Autocomplete
          id="combo-box-policeStation"
          options={driverList}
          getOptionLabel={(option) => option.NIC}
          className={classes.combo}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Select Driver NIC"
              variant="outlined"
            />
          )}
          onChange={handleStationChange}
        />
      </PapperBlock>
      <PapperBlock title={name} icon="ios-car-outline" whiteBg noMargin desc={NIC}>
        <Divider className={classes.divider} />
        <List dense className={classes.profileList}>
          <ListItem>
            <ListItemAvatar>
              <Avatar>
                <AccountCircleIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary="License Number" secondary={licenseNumber} />
          </ListItem>
          <ListItem>
            <ListItemAvatar>
              <Avatar>
                <NoteAddIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary="address" secondary={address} />
          </ListItem>
          <ListItem>
            <ListItemAvatar>
              <Avatar>
                <SecurityIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary="Category" secondary={category} />
          </ListItem>
        </List>
      </PapperBlock>
    </div>
  );
}

const reducerFirestore = 'firestore';

DriverProfile.propTypes = {
  classes: PropTypes.object.isRequired,
  // eslint-disable-next-line react/require-default-props
  auth: PropTypes.object,
  // eslint-disable-next-line react/require-default-props
  drivers: PropTypes.array,
};

const mapStateToProps = (state) => ({
  auth: state.getIn(['firebase']).auth,
  drivers: state.get(reducerFirestore).ordered[COLLECTIONS.DRIVER],
});
export default compose(
  firestoreConnect(() => [
    { collection: COLLECTIONS.DRIVER },
  ]),
  connect(
    mapStateToProps,
  ))(withStyles(styles)(withFirebase(DriverProfile)));
