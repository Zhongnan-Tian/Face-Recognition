import React from 'react';
// import GoogleAuth from '../GoogleAuth';
import './LogIn.css';

class LogIn extends React.Component {
  onSubmit = event => {
    event.preventDefault();
    console.log('form submitted');
  };

  render() {
    //console.log(this.props);
    return (
      <div id="login">
        <div className="container">
          <div className="row">
            <div className="col-md-6 m-auto">
              <button
                onClick={this.props.googleSignIn}
                type="submit"
                className="btn btn-info btn-lg btn-block mb-3"
                // style={{ backgroundColor: 'transparent' }}
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
                  {/* <label>
                    <h4 className="text-white">Email</h4>
                  </label> */}
                  <input
                    type="email"
                    placeholder="Email"
                    className="form-control mb-3 text-white"
                    style={{ backgroundColor: 'transparent' }}
                  />
                  {/* <label>
                    <h4 className="text-white">Password</h4>
                  </label> */}
                  <input
                    type="password"
                    placeholder="Password"
                    className="form-control mb-3 text-white"
                    style={{ backgroundColor: 'transparent' }}
                  />
                  <button
                    type="submit"
                    className="btn btn-info btn-block"
                    // style={{ backgroundColor: 'transparent' }}
                  >
                    Login
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

export default LogIn;
