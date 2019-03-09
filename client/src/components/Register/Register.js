import React from 'react';

const Register = () => {
  return (
    <div id="register">
      <div className="container">
        <div className="row">
          <div className="col-md-6 m-auto">
            <div>
              <div className="form-group">
                {/* <label>
                    <h4 className="text-white">Email</h4>
                  </label> */}
                <input
                  name="name"
                  type="text"
                  placeholder="Name"
                  className="form-control mb-3 text-white"
                  style={{ backgroundColor: 'transparent' }}
                />
                <input
                  name="email"
                  type="email"
                  placeholder="Email"
                  className="form-control mb-3 text-white"
                  style={{ backgroundColor: 'transparent' }}
                />
                {/* <label>
                    <h4 className="text-white">Password</h4>
                  </label> */}
                <input
                  name="password"
                  type="password"
                  placeholder="Password"
                  className="form-control mb-3 text-white"
                  style={{ backgroundColor: 'transparent' }}
                />
                <input
                  name="password2"
                  type="password"
                  placeholder="Confirm Password"
                  className="form-control mb-3 text-white"
                  style={{ backgroundColor: 'transparent' }}
                />
                <button
                  type="submit"
                  className="btn btn-info btn-block"
                  // style={{ backgroundColor: 'transparent' }}
                >
                  Sign Up
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
