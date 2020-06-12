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
import { bindActionCreators, compose } from 'redux';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { firestoreConnect, withFirebase } from 'react-redux-firebase';
import Loading from 'dan-components/Loading';
import { connect } from 'react-redux';
import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button';
import { COLLECTIONS } from '../../config/dbConstants';
import styles from './profile-jss';
import { editStation } from './actions';

// import firestore from '../../config/firebaseConfig';

function PoliceMenProfileSta(props) {
  // const policeStation = 'Default';
  // const policeMan = 'Default';
  const {
    classes, auth, policeMen, webUsers, SubmitData
  } = props;
  if (!auth || !policeMen || !webUsers) {
    return (<Loading />);
  }
  // PoliceMan
  const [name, setName] = React.useState(' ');
  const [email, setEmail] = React.useState(' ');
  const [employeeID, setEmployeeID] = React.useState(' ');
  const [Address, setAddress] = React.useState(' ');
  const [phone, setPhone] = React.useState(' ');
  const [Station, setStation] = React.useState({ Station: null });

  const loadedRTA = webUsers.filter(user => user.email === auth.email)[0];
  const AllpoliceStatuions = webUsers.filter(user => user.type === 'policeStation');
  const RTApoliceStations = AllpoliceStatuions.filter(user => user.rta.id === loadedRTA.id);

  const policeStationlist = RTApoliceStations.map(station => ({ Station: station.station_id }));


  const handleStationChange = (event, value) => {
    setStation(value);
  };
  let PoliceMen = [];
  if (Station !== null) {
    PoliceMen = policeMen.filter(user => user.station_id === Station.Station);
  }
  const handlePoliceManChange = (event, value) => {
    setName((value.first_name + ' ' + value.last_name));
    setEmail(value.mail_id);
    setEmployeeID(value.employee_id);
    setAddress(value.address);
    setPhone(value.phone_number);
  };

  const handleSubmit = () => {
    SubmitData(email);
  };

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
      <PapperBlock title="Select Policeman" desc="Select the policeStation and the policeman">
        <FormControl variant="outlined" className={classes.formControl}>
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
        </FormControl>
        <FormControl variant="outlined" className={classes.formControl}>
          <Autocomplete
            id="combo-box-policemen"
            options={PoliceMen}
            getOptionLabel={(option) => option.employee_id}
            className={classes.combo}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Select PoliceMen"
                variant="outlined"
                style={{ minWidth: 200 }}
              />
            )}
            onChange={handlePoliceManChange}
          />
        </FormControl>
      </PapperBlock>
      { name !== ' ' ? (

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
          <Divider className={classes.divider} />
          {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-noninteractive-element-interactions */}
          <form onClick={handleSubmit}>
            <div className={classes.btnArea}>
              <Button variant="contained" color="primary" type="button">
              Change Police Station
              </Button>
            </div>
          </form>

        </PapperBlock>
      ) : <div />}
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
  policeMen: PropTypes.array,
  // eslint-disable-next-line react/require-default-props
  SubmitData: PropTypes.func
};

const mapStateToProps = (state) => ({
  auth: state.getIn(['firebase']).auth,
  webUsers: state.get(reducerFirestore).ordered[COLLECTIONS.USER],
  policeMen: state.get(reducerFirestore).ordered[COLLECTIONS.POLICEMAN],
});
const mapDispatchToProps = (dispatch) => ({
  SubmitData: bindActionCreators(editStation, dispatch)
});
export default compose(
  firestoreConnect(() => [
    { collection: COLLECTIONS.USER },
    { collection: COLLECTIONS.POLICEMAN },
  ]),
  connect(
    mapStateToProps, mapDispatchToProps
  ))(withStyles(styles)(withFirebase(PoliceMenProfileSta)));
