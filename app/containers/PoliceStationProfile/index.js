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
import LocationOn from '@material-ui/icons/LocationOn';
import LocalPhone from '@material-ui/icons/LocalPhone';
import EmailIcon from '@material-ui/icons/Email';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { compose } from 'redux';
import { firestoreConnect, withFirebase } from 'react-redux-firebase';
import Loading from 'dan-components/Loading';
import { connect } from 'react-redux';
import { COLLECTIONS } from '../../config/dbConstants';
import styles from './profile-jss';
// import firestore from '../../config/firebaseConfig';

function PoliceStationProfile(props) {
  // let policeStation = 'Default';
  const {
    classes, auth, webUsers
  } = props;
  if (!auth || !webUsers) {
    return (<Loading />);
  }
  const [policeStation, setPoliceStation] = React.useState('Default');

  const [region, setRegion] = React.useState('  ');
  const [stationID, setstationID] = React.useState('  ');
  const [address, setaddress] = React.useState('  ');
  const [phoneNo, setphoneNo] = React.useState('  ');
  const [email, setEmail] = React.useState('  ');

  const loadedRTA = webUsers.filter(user => user.email === auth.email)[0];
  const AllpoliceStatuions = webUsers.filter(user => user.type === 'policeStation');
  const RTApoliceStations = AllpoliceStatuions.filter(user => user.rta.id === loadedRTA.id);
  const policeStationlist = RTApoliceStations.map(station => ({ Station: station.station_id }));


  const handleStationChange = (event, value) => {
    setPoliceStation(value);
    console.log(policeStation);
    const selStation = RTApoliceStations.filter(user => user.station_id === value.Station)[0];
    console.log(selStation);
    setaddress(selStation.address);
    setEmail(selStation.email);
    setphoneNo(selStation.phone_number);
    setRegion(selStation.region);
    setstationID(selStation.station_id);
  };

  const title = brand.name + ' - Police Station Profiles';
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
      <PapperBlock title="Select Police Station" desc="Select the policeStation">
        <Autocomplete
          id="combo-box-policeStation"
          options={policeStationlist}
          getOptionLabel={(option) => option.Station}
          className={classes.combo}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Select Police Station"
              variant="outlined"
              style={{ minWidth: 200 }}
            />
          )}
          onChange={handleStationChange}
        />
      </PapperBlock>
      {stationID !== '  '
        ? (
          <PapperBlock title={region} icon="ios-contact-outline" whiteBg noMargin desc={stationID}>
            <Divider className={classes.divider} />
            <List dense className={classes.profileList}>
              <ListItem>
                <ListItemAvatar>
                  <Avatar>
                    <EmailIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary="Email Address" secondary={email} />
              </ListItem>
              <ListItem>
                <ListItemAvatar>
                  <Avatar>
                    <LocalPhone />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary="Contact Number" secondary={phoneNo} />
              </ListItem>
              <ListItem>
                <ListItemAvatar>
                  <Avatar>
                    <LocationOn />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary="Address" secondary={address} />
              </ListItem>
            </List>
          </PapperBlock>
        ) : <div />}
    </div>
  );
}

const reducerFirestore = 'firestore';

PoliceStationProfile.propTypes = {
  classes: PropTypes.object.isRequired,
  // eslint-disable-next-line react/require-default-props
  auth: PropTypes.object,
  // eslint-disable-next-line react/require-default-props
  webUsers: PropTypes.array,
};

const mapStateToProps = (state) => ({
  auth: state.getIn(['firebase']).auth,
  webUsers: state.get(reducerFirestore).ordered[COLLECTIONS.USER],
});
export default compose(
  firestoreConnect(() => [
    { collection: COLLECTIONS.USER },
  ]),
  connect(
    mapStateToProps,
  ))(withStyles(styles)(withFirebase(PoliceStationProfile)));
