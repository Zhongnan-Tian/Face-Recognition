import React from 'react';

import ImageLinkForm from './ImageLinkForm/ImageLinkForm.js';
import Rank from './Rank/Rank';
import ImageShow from './ImageShow/ImageShow';

const MainContent = props => {
  return (
    <div>
      <Rank />
      <ImageLinkForm />
      {props.imageURL && <ImageShow />}
    </div>
  );
};

const mapStateToProps = state => {
  return { imageURL: state.imageURL };
};

export default connect(mapStateToProps)(MainContent);
