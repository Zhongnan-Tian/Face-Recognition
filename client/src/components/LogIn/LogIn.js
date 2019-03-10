import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import classnames from 'classnames';

import './LogIn.css';
import { localSignIn } from '../../actions';

class LogIn extends React.Component {
  state = {
    email: '',
    password: ''
  };

  componentDidMount() {
    if (this.props.isSignedIn || this.props.localUserSignedIn) {
      this.props.history.push('/');
    }
  }

  componentDidUpdate() {
    if (this.props.isSignedIn || this.props.localUserSignedIn) {
      this.props.history.push('/');
    }
  }

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  onSubmit = event => {
    event.preventDefault();

    const userInfo = {
      email: this.state.email,
      password: this.state.password
    };

    this.props.localSignIn(userInfo, this.props.history);
  };

  render() {
    return (
      <div id="login">
        <div className="container">
          <div className="row">
            <div className="col-md-6 m-auto">
              <button
                onClick={this.props.googleSignIn}
                type="submit"
                className="btn btn-info btn-lg btn-block mb-3"
              >
                <i className="fab fa-google mr-2" />
                Login with Google
              </button>
            </div>
          </div>

          <div className="row">
            <div className="col-md-8 m-auto">
              <p id="tagOr" className="text-white">
                OR
              </p>
            </div>
          </div>

          <div className="row">
            <div className="col-md-6 m-auto">
              <div>
                <form onSubmit={this.onSubmit} className="form-group">
                  <input
                    name="email"
                    type="email"
                    placeholder="Email"
                    className={classnames('form-control mb-2 text-white', {
                      'is-invalid': this.props.errors && this.props.errors.email
                    })}
                    style={{ backgroundColor: 'transparent' }}
                    onChange={this.onChange}
                    value={this.state.email}
                  />
                  {this.props.errors && this.props.errors.email && (
                    <div className="invalid-feedback mb-2">
                      {this.props.errors.email}
                    </div>
                  )}

                  <input
                    name="password"
                    type="password"
                    placeholder="Password"
                    className={classnames('form-control mb-2 text-white', {
                      'is-invalid':
                        this.props.errors && this.props.errors.password
                    })}
                    style={{ backgroundColor: 'transparent' }}
                    onChange={this.onChange}
                    value={this.state.password}
                  />
                  {this.props.errors && this.props.errors.password && (
                    <div className="invalid-feedback mb-2">
                      {this.props.errors.password}
                    </div>
                  )}

                  <button
                    type="submit"
                    className="btn btn-info btn-block mt-3 mb-3"
                  >
                    Login
                  </button>
                  <p className="text-white">
                    Not a user? <Link to="/register">Sign Up here</Link>
                  </p>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    isSignedIn: state.auth.isSignedIn,
    localUserSignedIn: state.auth.localUserSignedIn,
    errors: state.errors
  };
};

export default connect(
  mapStateToProps,
  { localSignIn }
)(LogIn);
