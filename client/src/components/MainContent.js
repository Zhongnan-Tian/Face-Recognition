import React from 'react';

// import Logo from './Logo/Logo';
import ImageLinkForm from './ImageLinkForm/ImageLinkForm.js';
import Rank from './Rank/Rank';
import ImageShow from './ImageShow/ImageShow';

const MainContent = props => {
  // if (!props.isSignedIn) {
  //   props.history.push('/login');
  //   return null;
  // } else {
  return (
    <div>
      {/* <Logo /> */}
      <Rank />
      <ImageLinkForm />
      <ImageShow />
    </div>
  );
  // }
};

export default MainContent;
