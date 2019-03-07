import React from 'react';
import Particles from 'react-particles-js';

import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm.js';
import Rank from './components/Rank/Rank';
import ImageShow from './components/ImageShow/ImageShow';

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
  render() {
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
        <Navigation />
        <Logo />
        <Rank />
        <ImageLinkForm />
        <ImageShow />
        {/* <Footer /> */}
      </div>
    );
  }
}

export default App;
