import React from 'react';
import Particles from 'react-particles-js';
import { connect } from 'react-redux';
import jwt_decode from 'jwt-decode';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { GOOGLE_CLIENT_ID } from './config';

import Navigation from './components/Navigation/Navigation';
import MainContent from './components/MainContent';
import LogIn from './components/LogIn/LogIn';
import Register from './components/Register/Register.js';
import { userSignedIn, userSignedOut } from './actions';
import setAuthToken from './utils/setAuthToken';
import { setLocalUser, logoutLocalUser } from './actions/';

const particlesOptions = {
  particles: {
    number: {
      value: 150,
      density: {
        enable: true,
        value_area: 900
      }
    }
  }
};

class App extends React.Component {
  constructor(props) {
    super(props);

    window.gapi.load('client:auth2', () => {
      window.gapi.client
        .init({
          clientId: GOOGLE_CLIENT_ID,
          scope: 'email'
        })
        .then(() => {
          this.auth = window.gapi.auth2.getAuthInstance();
          this.onAuthChange(this.auth.isSignedIn.get());
          this.auth.isSignedIn.listen(this.onAuthChange);
        });
    });

    // Check for token
    if (localStorage.jwtToken) {
      // Set auth token header auth
      setAuthToken(localStorage.jwtToken);
      // Decode token and get user info and exp
      const decoded = jwt_decode(localStorage.jwtToken);
      // Set user and isAuthenticated
      this.props.setLocalUser(decoded);

      // Check for expired token
      const currentTime = Date.now() / 1000;
      if (decoded.exp < currentTime) {
        // Logout user
        this.props.logoutLocalUser();
        // Redirect to login
        window.location.href = '/login';
      }
    }
  }

  onAuthChange = isSignedIn => {
    if (isSignedIn) {
      this.props.userSignedIn(this.auth.currentUser.get().getId());
    } else {
      this.props.userSignedOut();
    }
  };

  onSignInClick = () => {
    this.auth.signIn();
  };

  onSignOutClick = () => {
    this.auth.signOut();
  };

  render() {
    // console.log(
    //   'login: ' + (this.props.isSignedIn || this.props.localUserSignedIn)
    // );

    return (
      <div id="app" className="text-center">
        <Particles
          params={particlesOptions}
          style={{
            position: 'fixed',
            top: '0',
            right: '0',
            bottom: '0',
            left: '0',
            zIndex: '-1'
          }}
        />
        <BrowserRouter>
          <div>
            <Navigation logOut={this.onSignOutClick} />
            <Switch>
              <Route
                path="/"
                exact
                render={props =>
                  this.props.isSignedIn || this.props.localUserSignedIn ? (
                    <MainContent {...props} />
                  ) : (
                    <LogIn {...props} googleSignIn={this.onSignInClick} />
                  )
                }
              />
              <Route
                path="/login"
                exact
                render={props => (
                  <LogIn {...props} googleSignIn={this.onSignInClick} />
                )}
              />
              <Route path="/register" exact component={Register} />
            </Switch>
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    isSignedIn: state.auth.isSignedIn,
    localUserSignedIn: state.auth.localUserSignedIn,
    localUser: state.auth.isSignedIn
  };
};

export default connect(
  mapStateToProps,
  { userSignedIn, userSignedOut, setLocalUser, logoutLocalUser }
)(App);
