import React from 'react';
import Particles from 'react-particles-js';
import { connect } from 'react-redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Navigation from './components/Navigation/Navigation';
import MainContent from './components/MainContent';
// import Logo from './components/Logo/Logo';
// import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm.js';
// import Rank from './components/Rank/Rank';
// import ImageShow from './components/ImageShow/ImageShow';
import LogIn from './components/LogIn/LogIn';
import { userSignedIn, userSignedOut } from './actions';

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
          clientId:
            '306901847650-7bq1hj5d76atof1d69sgf2fhjm08f2eg.apps.googleusercontent.com',
          scope: 'email'
        })
        .then(() => {
          this.auth = window.gapi.auth2.getAuthInstance();
          this.onAuthChange(this.auth.isSignedIn.get());
          this.auth.isSignedIn.listen(this.onAuthChange);
        });
    });
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
    console.log('login: ' + this.props.isSignedIn);

    // MyLogInPage = () => {
    //   return <LogIn googleSignIn={this.onSignInClick} />;
    // };

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
                  this.props.isSignedIn ? (
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
            </Switch>
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { isSignedIn: state.auth.isSignedIn };
};

export default connect(
  mapStateToProps,
  { userSignedIn, userSignedOut }
)(App);
