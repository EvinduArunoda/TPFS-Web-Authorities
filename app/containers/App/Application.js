import React from 'react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import { Switch, Route, Redirect } from 'react-router-dom';
import { compose } from 'redux';
import { firestoreConnect, isLoaded, withFirebase } from 'react-redux-firebase';
import Dashboard from '../Templates/Dashboard';
import { COLLECTIONS } from '../../config/dbConstants';
import {
  Parent,
  DashboardPage,
  BlankPage,
  Form,
  Table,
  Error,
  NotFound
} from '../pageListAsync';

class Application extends React.Component {
  render() {
    const {
      changeMode, history, auth, users
    } = this.props;
    if (!auth.isLoaded || !isLoaded(users)) return null;
    const loadedUser = users.filter(user => user.email === auth.email)[0];
    const redirect = auth.uid && (loadedUser.type === 'rta' || loadedUser.type === 'policeStation');
    const logged = auth.uid;
    if (auth.uid && (loadedUser.type !== 'rta' && loadedUser.type !== 'policeStation')) {
      // eslint-disable-next-line react/destructuring-assignment,react/prop-types
      this.props.firebase.auth().signOut();
      // window.location.href = '/';
    }
    const a = true;
    return (
      <Dashboard history={history} changeMode={changeMode}>
        { redirect
          ? (
            a ? (
              <Switch>
                <Route exact path="/app" component={BlankPage} />
                <Route path="/app/dashboard" component={DashboardPage} />
                <Route path="/app/form" component={Form} />
                <Route path="/app/table" component={Table} />
                <Route path="/app/page-list" component={Parent} />
                <Route path="/app/pages/not-found" component={NotFound} />
                <Route path="/app/pages/error" component={Error} />
                <Route component={NotFound} />
              </Switch>
            ) : (
              <Switch>
                <Route exact path="/app" component={BlankPage} />
                <Route path="/app/dashboard" component={BlankPage} />
                <Route path="/app/form" component={Form} />
                <Route path="/app/table" component={Table} />
                <Route path="/app/page-list" component={Parent} />
                <Route path="/app/pages/not-found" component={NotFound} />
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
  // eslint-disable-next-line react/require-default-props,react/no-unused-prop-types
};

const reducerFirestore = 'firestore';


const mapStateToProps = (state) => ({
  auth: state.getIn(['firebase']).auth,
  users: state.get(reducerFirestore).ordered[COLLECTIONS.USER],
});

const AppInit = compose(
  firestoreConnect(() => [
    { collection: COLLECTIONS.USER },
  ]),
  connect(
    mapStateToProps,
  ))(withFirebase(Application));

export default AppInit;
