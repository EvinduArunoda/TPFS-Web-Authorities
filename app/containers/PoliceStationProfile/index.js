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
import PaypalExpressBtn from 'react-paypal-express-checkout';
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
  const onSuccess = (payment) => {
    // Congratulation, it came here means everything's fine!
    console.log('The payment was succeeded!', payment);
    // You can bind the "payment" object's value to your state or props or whatever here, please see below for sample returned data
  };

  const onCancel = (data) => {
    // User pressed "cancel" or close Paypal's popup!
    console.log('The payment was cancelled!', data);
    // You can bind the "data" object's value to your state or props or whatever here, please see below for sample returned data
  };

  const onError = (err) => {
    // The main Paypal's script cannot be loaded or somethings block the loading of that script!
    console.log('Error!', err);
    // Because the Paypal's main script is loaded asynchronously from "https://www.paypalobjects.com/api/checkout.js"
    // => sometimes it may take about 0.5 second for everything to get set, or for the button to appear
  };

  const env = 'sandbox'; // you can set here to 'production' for production
  const currency = 'USD'; // or you can set this value from your props or state
  const total = 1; // same as above, this is the total amount (based on currency) to be paid by using Paypal express checkout
  // Document on Paypal's currency code: https://developer.paypal.com/docs/classic/api/currency_codes/

  const client = {
    sandbox: 'AakDV9OoOkCKMKwS2BqNHU7KZm-iZq_Or56wxSg2kUXD19ruf3yYO9V80qtbmPrnTxVQQbNBwNsTkkPX',
    production: 'YOUR-PRODUCTION-APP-ID',
  };
  // In order to get production's app-ID, you will have to send your app to Paypal for approval first
  // For sandbox app-ID (after logging into your developer account, please locate the "REST API apps" section, click "Create App"):
  //   => https://developer.paypal.com/docs/classic/lifecycle/sb_credentials/
  // For production app-ID:
  //   => https://developer.paypal.com/docs/classic/lifecycle/goingLive/

  // NB. You can also have many Paypal express checkout buttons on page, just pass in the correct amount and they will work!

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
            />
          )}
          onChange={handleStationChange}
        />
      </PapperBlock>
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
        <PaypalExpressBtn env={env} client={client} currency={currency} total={total} onError={onError} onSuccess={onSuccess} onCancel={onCancel} />
      </PapperBlock>
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
