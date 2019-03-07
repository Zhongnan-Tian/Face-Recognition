import React from 'react';
import Tilt from 'react-tilt';
import brain from './brain.png';

const Logo = () => {
  return (
    <div id="logo" style={{ marginTop: '100px' }}>
      <div className="container">
        <div className="row">
          <div className="col m-auto">
            <Tilt
              className="Tilt"
              options={{ max: 65 }}
              style={{ height: 100, width: 100 }}
            >
              <div className="Tilt-inner">
                <img src={brain} alt="logo" />
              </div>
            </Tilt>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Logo;
