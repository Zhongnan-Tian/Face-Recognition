import React from 'react';
import { connect } from 'react-redux';

import { userSignedIn, userSignedOut } from '../actions';

class GoogleAuth extends React.Component {
  componentDidMount() {
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

  showLogStatus = () => {
    if (this.props.isSignedIn === null) {
      return (
        <div>
          <button className="btn btn-secondary">loading...</button>
        </div>
      );
    } else if (this.props.isSignedIn) {
      return (
        <div>
          <button className="btn btn-primary" onClick={this.onSignOutClick}>
            Log out
          </button>
        </div>
      );
    } else {
      return (
        <div>
          <button className="btn btn-danger" onClick={this.onSignInClick}>
            <i className="fab fa-google mr-2" />
            Login with Google
          </button>
        </div>
      );
    }
  };

  render() {
    return <div>{this.showLogStatus()}</div>;
  }
}

const mapStateToProps = state => {
  return { isSignedIn: state.auth.isSignedIn };
};

export default connect(
  mapStateToProps,
  { userSignedIn, userSignedOut }
)(GoogleAuth);
