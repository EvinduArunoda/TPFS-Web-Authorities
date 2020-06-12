import React from 'react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import { Switch, Route, Redirect } from 'react-router-dom';
import { compose } from 'redux';
import { firestoreConnect, isLoaded, withFirebase } from 'react-redux-firebase';
import Dashboard from '../Templates/Dashboard';
import { COLLECTIONS } from '../../config/dbConstants';
import {
  Error,
  NotFound,
  RegisterPoliceman,
  RegisterPoliceStation,
  RegisterDrivers,
  RegisterVehicles,
  HandleComplaints,
  PoliceMenProfileSta,
  PoliceStationProfile,
  VehicleProfiles,
  DriverProfile,
  RegDriverSec,
  AssignPoliceStation,
  AddVehicleDetails,
  HandleOpenTickets,
  ViewTickets,
  EnterPaymentDetails,
  ConfirmCloseTicket,
  PoliceManProfiles,
  ChangePassword,
  ResetPasswordCode,
  ResetPassword,
  FeedBackForm,
  ViewTicketsRta,
  AddRegionalRules,
  ManageRules,
  ChangePoliceStation
} from '../pageListAsync';

class Application extends React.Component {
  render() {
    const {
      changeMode, history, auth, users, registered, registeredPoliceMen, registeredVehicle, ticketID, ticketStatus, validEmail, validCode, complaintIDSet, emailSet
    } = this.props;
    if (!auth.isLoaded || !isLoaded(users)) return null;
    const loadedUser = users.filter(user => user.email === auth.email)[0];
    console.log(users);
    const loadedUsers = users.filter(user => user.email === auth.email);
    // eslint-disable-next-line react/destructuring-assignment,react/prop-types
    if (loadedUsers.length === 0) this.props.firebase.auth().signOut();

    const logged = auth.uid;

    let redirect = false;
    let a = false;

    if (auth.uid) {
      if (loadedUser.type === 'rta' || loadedUser.type === 'policeStation') {
        redirect = true;
        if (loadedUser.type === 'policeStation') {
          a = true;
        }
      } else {
        // eslint-disable-next-line react/destructuring-assignment,react/prop-types
        this.props.firebase.auth().signOut();
        redirect = false;
      }
    } else {
      redirect = false;
    }

    return (
      <Dashboard history={history} changeMode={changeMode}>
        { redirect
          ? (
            a ? (
              <Switch>
                <Route exact path="/app" component={ViewTickets} />
                { !ticketID ? <Route path="/app/HandleOpenTickets" component={HandleOpenTickets} /> : ticketStatus ? <Route path="/app/HandleOpenTickets" component={ConfirmCloseTicket} />
                  : <Route path="/app/HandleOpenTickets" component={EnterPaymentDetails} />
                }
                { !validEmail ? <Route path="/app/Change-Password" component={ChangePassword} /> : !validCode ? <Route path="/app/Change-Password" component={ResetPasswordCode} /> : <Route path="/app/Change-Password" component={ResetPassword} />}
                <Route path="/app/ViewTickets" component={ViewTickets} />
                <Route path="/app/EnterPaymentDetails" component={EnterPaymentDetails} />
                <Route path="/app/PoliceMan-Profiles" component={PoliceManProfiles} />
                <Route path="/app/Driver-Profile" component={DriverProfile} />
                <Route path="/app/Vehicle-Profile" component={VehicleProfiles} />
                <Route path="/app/pages/not-found" component={NotFound} />
                <Route path="/app/pages/error" component={Error} />
                <Route component={NotFound} />
              </Switch>
            ) : (
              <Switch>
                <Route exact path="/app" component={PoliceStationProfile} />
                { !complaintIDSet ? <Route path="/app/HandleComplaints" component={HandleComplaints} /> : <Route path="/app/HandleComplaints" component={FeedBackForm} />}
                {!registeredPoliceMen ? <Route path="/app/RegisterPolicemen" component={RegisterPoliceman} /> : <Route path="/app/RegisterPolicemen" component={AssignPoliceStation} /> }
                <Route path="/app/RegisterPoliceStation" component={RegisterPoliceStation} />
                {!registered ? <Route path="/app/RegisterDrivers" component={RegisterDrivers} /> : <Route path="/app/RegisterDrivers" component={RegDriverSec} />}
                <Route path="/app/RegisterDrivers" component={RegisterDrivers} />
                {!registeredVehicle ? <Route path="/app/RegisterVehicles" component={RegisterVehicles} /> : <Route path="/app/RegisterVehicles" component={AddVehicleDetails} />}
                {!emailSet ? <Route path="/app/Policeman-Profile" component={PoliceMenProfileSta} /> : <Route path="/app/Policeman-Profile" component={ChangePoliceStation} />}
                <Route path="/app/PoliceStationProfile" component={PoliceStationProfile} />
                <Route path="/app/Vehicle-Profile" component={VehicleProfiles} />
                <Route path="/app/Driver-Profile" component={DriverProfile} />
                <Route path="/app/ViewTickets" component={ViewTicketsRta} />
                { !validEmail ? <Route path="/app/Change-Password" component={ChangePassword} /> : !validCode ? <Route path="/app/Change-Password" component={ResetPasswordCode} /> : <Route path="/app/Change-Password" component={ResetPassword} />}
                <Route path="/app/Regional-Rules" component={AddRegionalRules} />
                <Route path="/app/Manage-Rules" component={ManageRules} />
                <Route path="/app/pages/error" component={Error} />
                <Route component={NotFound} />
              </Switch>
            )
          )
          : logged ? (
            <Redirect to="/app/pages/error" />
          )
            : <Redirect to="/" />
        }
      </Dashboard>
    );
  }
}

Application.propTypes = {
  changeMode: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
  // eslint-disable-next-line react/require-default-props
  users: PropTypes.array,
  // eslint-disable-next-line react/require-default-props
  auth: PropTypes.object,
  // eslint-disable-next-line react/require-default-props
  registered: PropTypes.Boolean,
  // eslint-disable-next-line react/require-default-props
  registeredPoliceMen: PropTypes.Boolean,
  // eslint-disable-next-line react/require-default-props
  registeredVehicle: PropTypes.Boolean,
  // eslint-disable-next-line react/require-default-props
  ticketID: PropTypes.Boolean,
  // eslint-disable-next-line react/require-default-props
  ticketStatus: PropTypes.Boolean,
  // eslint-disable-next-line react/require-default-props
  validEmail: PropTypes.boolean,
  // eslint-disable-next-line react/require-default-props
  validCode: PropTypes.boolean,
  // eslint-disable-next-line react/require-default-props
  complaintIDSet: PropTypes.boolean,
  // eslint-disable-next-line react/require-default-props
  emailSet: PropTypes.boolean,
};

const reducerFirestore = 'firestore';
const RegReducer = 'regDriver';
const policeMenReducer = 'regPoliceMen';
const vehicleReducer = 'regVehicle';
const tktReducer = 'openTktReducer';
const forgetPasswordReducer = 'ForgetPassword';
const resetPasswordCodeReducer = 'resetPasswordCode';
const complaintReducer = 'complaintReducer';
const policemanProfileReducer = 'PolicemanProfile';

const mapStateToProps = (state) => ({
  auth: state.getIn(['firebase']).auth,
  users: state.get(reducerFirestore).ordered[COLLECTIONS.USER],
  registered: state.getIn([RegReducer, 'registered']),
  registeredPoliceMen: state.getIn([policeMenReducer, 'registered']),
  registeredVehicle: state.getIn([vehicleReducer, 'registered']),
  ticketID: state.getIn([tktReducer, 'idSet']),
  ticketStatus: state.getIn([tktReducer, 'status']),
  validEmail: state.getIn([forgetPasswordReducer, 'validEmail']),
  validCode: state.getIn([resetPasswordCodeReducer, 'validCode']),
  complaintIDSet: state.getIn([complaintReducer, 'redirect']),
  emailSet: state.getIn([policemanProfileReducer, 'emailSet']),
});

const AppInit = compose(
  firestoreConnect(() => [
    { collection: COLLECTIONS.USER },
  ]),
  connect(
    mapStateToProps,
  ))(withFirebase(Application));

export default AppInit;
