import React from 'react';
import { connect } from 'react-redux';

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
            <i className="fab fa-connectdevelop fa-lg mr-2" />
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
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

const mapStateToProps = state => {
  return { isSignedIn: state.auth.isSignedIn };
};

export default connect(mapStateToProps)(Navigation);
