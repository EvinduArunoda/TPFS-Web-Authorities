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
import FormControl from '@material-ui/core/FormControl';
import { COLLECTIONS } from '../../config/dbConstants';
import styles from './profile-jss';

function ViewPolicemanProfile(props) {
  const {
    classes, auth, policeMen, webUsers
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

  const loadedUser = webUsers.filter(user => user.email === auth.email)[0];

  const PoliceMen = policeMen.filter(user => user.station_id === loadedUser.station_id);

  const handlePoliceManChange = (event, value) => {
    setName((value.first_name + ' ' + value.last_name));
    setEmail(value.mail_id);
    setEmployeeID(value.employee_id);
    setAddress(value.address);
    setPhone(value.phone_number);
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
      <PapperBlock title="View Policeman Profile" desc="Select the policeman">
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
      {name !== ' '
        ? (
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
        ) : <div />}
    </div>
  );
}

const reducerFirestore = 'firestore';

ViewPolicemanProfile.propTypes = {
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
  ))(withStyles(styles)(withFirebase(ViewPolicemanProfile)));
