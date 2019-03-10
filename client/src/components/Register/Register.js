import React from 'react';
import { connect } from 'react-redux';
import classnames from 'classnames';

import './Register.css';
import { registerUser } from '../../actions';

class Register extends React.Component {
  state = {
    name: '',
    email: '',
    password: '',
    password2: ''
  };

  componentDidMount() {
    if (this.props.isSignedIn || this.props.localUserSignedIn) {
      console.log(
        'register: ' + (this.props.isSignedIn || this.props.localUserSignedIn)
      );
      this.props.history.push('/');
    }
  }

  componentDidUpdate() {
    if (this.props.isSignedIn || this.props.localUserSignedIn) {
      console.log(
        'register: ' + (this.props.isSignedIn || this.props.localUserSignedIn)
      );
      this.props.history.push('/');
    }
  }

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  onSubmit = event => {
    event.preventDefault();

    const newUser = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      password2: this.state.password2
    };

    this.props.registerUser(newUser, this.props.history);
  };

  render() {
    return (
      <div id="register">
        <div className="container">
          <div className="row">
            <div className="col-md-6 m-auto">
              <div>
                <form className="form-group" onSubmit={this.onSubmit}>
                  <input
                    name="name"
                    type="text"
                    placeholder="Name"
                    className={classnames('form-control mb-2 text-white', {
                      'is-invalid': this.props.errors && this.props.errors.name
                    })}
                    // className="form-control mb-3 text-white"
                    style={{ backgroundColor: 'transparent' }}
                    onChange={this.onChange}
                    value={this.state.name}
                  />
                  {this.props.errors && this.props.errors.name && (
                    <div className="invalid-feedback mb-2">
                      {this.props.errors.name}
                    </div>
                  )}

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

                  <input
                    name="password2"
                    type="password"
                    placeholder="Confirm Password"
                    className={classnames('form-control mb-2 text-white', {
                      'is-invalid':
                        this.props.errors && this.props.errors.password2
                    })}
                    style={{ backgroundColor: 'transparent' }}
                    onChange={this.onChange}
                    value={this.state.password2}
                  />
                  {this.props.errors && this.props.errors.password2 && (
                    <div className="invalid-feedback mb-2">
                      {this.props.errors.password2}
                    </div>
                  )}

                  <button type="submit" className="btn btn-info btn-block mt-3">
                    Sign Up
                  </button>
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
  { registerUser }
)(Register);
