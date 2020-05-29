import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import {
  Register,
  ResetPassword,
  ComingSoon,
  Maintenance,
  NotFound,
  LoginPage
} from '../pageListAsync';
import LoginDedicated from '../Pages/Standalone/LoginDedicated';
import Outer from '../Templates/Outer';

class Auth extends React.Component {
  render() {
    const {
      auth
    } = this.props;
    if (!auth.isLoaded) return null;
    const redirect = !auth.uid;
    // console.log(auth);
    return (
      <Outer>
        { redirect
          ? (
            <Switch>
              <Route path="/" exact component={LoginDedicated} />
              <Route path="/login" component={LoginPage} />
              <Route path="/register" component={Register} />
              <Route path="/reset-password" component={ResetPassword} />
              <Route path="/maintenance" component={Maintenance} />
              <Route path="/coming-soon" component={ComingSoon} />
              <Route component={NotFound} />
            </Switch>
          )
          : <Redirect to="/app" />
        }
      </Outer>
    );
  }
}

Auth.propTypes = {
  auth: PropTypes.object.isRequired

};


const mapStateToProps = (state) => ({
  auth: state.getIn(['firebase']).auth,
});

const AuthInit = connect(
  mapStateToProps,
)(Auth);

export default AuthInit;
