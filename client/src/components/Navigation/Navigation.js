import React from 'react';

import './Navigation.css';

const Navigation = () => {
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
                <a href="/" className="nav-link">
                  Register
                </a>
              </li>
              <li className="nav-item">
                <a href="/" className="nav-link">
                  Login
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navigation;
