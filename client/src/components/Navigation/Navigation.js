import React from 'react';
import { connect } from 'react-redux';

import { logoutLocalUser } from '../../actions';
import './Navigation.css';
// import GoogleAuth from '../GoogleAuth';

const Navigation = props => {
  return (
    <div>
      <nav
        id="main-nav"
        className="navbar fixed-top navbar-expand-sm navbar-dark bg-dark"
      >
        <div className="container">
          <a href="/" className="navbar-brand">
            <i className="fas fa-brain fa-lg mr-3" />
            Face Recognation
          </a>
          <button
            className="navbar-toggler"
            data-toggle="collapse"
            data-target="#collapseItems"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div id="collapseItems" className="collapse navbar-collapse">
            <ul className="navbar-nav ml-auto">
              <li className="nav-item">
                {/* <a href="/" className="nav-link">
                  Login
                </a> */}
                {/* <GoogleAuth /> */}
                {props.isSignedIn ? (
                  <button onClick={props.logOut} className="btn btn-info">
                    Logout
                  </button>
                ) : null}
                {props.localUserSignedIn ? (
                  <button
                    onClick={props.logoutLocalUser}
                    className="btn btn-info"
                  >
                    Log Out
                  </button>
                ) : null}
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    isSignedIn: state.auth.isSignedIn,
    localUserSignedIn: state.auth.localUserSignedIn
  };
};

export default connect(
  mapStateToProps,
  { logoutLocalUser }
)(Navigation);
