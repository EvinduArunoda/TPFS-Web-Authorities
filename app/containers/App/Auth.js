import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import {
  Register,
  ComingSoon,
  Maintenance,
  NotFound,
  LoginPage,
  ForgetPassword,
  ResetPasswordCode,
  ResetPassword
} from '../pageListAsync';
import LoginDedicated from '../Pages/Standalone/LoginDedicated';
import Outer from '../Templates/Outer';

class Auth extends React.Component {
  render() {
    const {
      auth, validEmail, validCode
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
              { !validEmail ? <Route path="/reset-password" component={ForgetPassword} /> : !validCode ? <Route path="/reset-password" component={ResetPasswordCode} /> : <Route path="/reset-password" component={ResetPassword} />}
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
  auth: PropTypes.object.isRequired,
  // eslint-disable-next-line react/require-default-props
  validEmail: PropTypes.boolean,
  // eslint-disable-next-line react/require-default-props
  validCode: PropTypes.boolean,
};
const forgetPasswordReducer = 'forgetPassword';
const resetPasswordCodeReducer = 'resetPasswordCode';

const mapStateToProps = (state) => ({
  auth: state.getIn(['firebase']).auth,
  validEmail: state.getIn([forgetPasswordReducer, 'validEmail']),
  validCode: state.getIn([resetPasswordCodeReducer, 'validCode']),
});

const AuthInit = connect(
  mapStateToProps,
)(Auth);

export default AuthInit;
