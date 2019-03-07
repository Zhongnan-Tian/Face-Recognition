import { CLARIFAI_KEY } from '../config';
import Clarifai from 'clarifai';

// initialize with your api key.

const app = new Clarifai.App({
  apiKey: CLARIFAI_KEY
});

export const userSignedIn = id => {
  return {
    type: 'SIGN_IN',
    payload: id
  };
};

export const userSignedOut = () => {
  return {
    type: 'SIGN_OUT'
  };
};

export const updateImageURL = url => {
  return {
    type: 'UPDATE_URL',
    payload: url
  };
};

export const fetchImageBoxes = (height, width) => {
  return async function(dispatch, getState) {
    //const imageSize = { height: height, width: width };

    const boxes = [];

    const data = await app.models.predict(
      Clarifai.FACE_DETECT_MODEL,
      getState().imageURL
    );

    const allFaces = data.outputs[0].data.regions;

    allFaces.forEach(face => {
      let clarifaiFace = face.region_info.bounding_box;

      let box = {
        leftCol: clarifaiFace.left_col * width,
        topRow: clarifaiFace.top_row * height,
        rightCol: width - clarifaiFace.right_col * width,
        bottomRow: height - clarifaiFace.bottom_row * height
      };

      boxes.push(box);
    });

    dispatch({
      type: 'FETCH_BOXES',
      payload: boxes
    });
  };
};
