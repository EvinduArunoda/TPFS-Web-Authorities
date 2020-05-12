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

function PoliceMenProfileSta(props) {
  let policeStation = 'Default';
  let policeMan = 'Default';
  const {
    classes, auth, policeMen, webUsers
  } = props;
  if (!auth || !policeMen || !webUsers) {
    return (<Loading />);
  }

  // console.log(policeMen);

  const loadedRTA = webUsers.filter(user => user.email === auth.email)[0];
  const AllpoliceStatuions = webUsers.filter(user => user.type === 'policeStation');
  const RTApoliceStations = AllpoliceStatuions.filter(user => user.rta.id === loadedRTA.id);

  const policeStationlist = RTApoliceStations.map(station => ({ Station: station.station_id }));

  const getPoliceMen = (PoliceStation) => {
    if (PoliceStation === 'Default') {
      return ([]);
    }
    return (policeMen.filter(user => user.station_id === PoliceStation));
  };

  const PoliceMen = getPoliceMen(policeStation).map(user => ({ employeeID: user.employee_id }));

  const handleStationChange = (event, value) => {
    policeStation = value;
    console.log(getPoliceMen(policeStation));
  };

  const handlePoliceManChange = (event, value) => {
    policeMan = value;
  };

  // if (policeStation !== 'Default') {
  // eslint-disable-next-line no-unused-vars
  const selectedPoliceMen = policeMen.filter(user => user.station_id === policeStation);

  // }


  // PoliceMan
  let name = 'Not Selected';
  let employeeID = 'Not Selected';
  let email = 'Not Selected';
  let Address = 'Not Selected';
  let phone = 'Not Selected';
  // eslint-disable-next-line prefer-destructuring
  policeMan = policeMen[0];
  name = policeMan.first_name + ' ' + policeMan.last_name;
  employeeID = policeMan.employee_id;
  email = policeMan.mail_id;
  Address = policeMan.address;
  phone = policeMan.phone_number;


  const title = brand.name + ' - PoliceMen Profiles';
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
      <PapperBlock title="Select PoliceMen" desc="Select the policeStation and the policeman">
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
        <Autocomplete
          id="combo-box-policemen"
          options={PoliceMen}
          getOptionLabel={(option) => option.employeeID}
          className={classes.combo}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Select PoliceMen"
              variant="outlined"
            />
          )}
          onChange={handlePoliceManChange}
        />
      </PapperBlock>
      <PapperBlock title={name} icon="ios-contact-outline" whiteBg noMargin desc={employeeID}>
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
            <ListItemText primary="Contact Number" secondary={phone} />
          </ListItem>
          <ListItem>
            <ListItemAvatar>
              <Avatar>
                <LocationOn />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary="Address" secondary={Address} />
          </ListItem>
        </List>
      </PapperBlock>
    </div>
  );
}

const reducerFirestore = 'firestore';

PoliceMenProfileSta.propTypes = {
  classes: PropTypes.object.isRequired,
  // eslint-disable-next-line react/require-default-props
  auth: PropTypes.object,
  // eslint-disable-next-line react/require-default-props
  webUsers: PropTypes.array,
  // eslint-disable-next-line react/require-default-props
  policeMen: PropTypes.array
};

const mapStateToProps = (state) => ({
  auth: state.getIn(['firebase']).auth,
  webUsers: state.get(reducerFirestore).ordered[COLLECTIONS.USER],
  policeMen: state.get(reducerFirestore).ordered[COLLECTIONS.POLICEMAN],
});
export default compose(
  firestoreConnect(() => [
    { collection: COLLECTIONS.USER },
    { collection: COLLECTIONS.POLICEMAN },
  ]),
  connect(
    mapStateToProps,
  ))(withStyles(styles)(withFirebase(PoliceMenProfileSta)));
