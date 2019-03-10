import { CLARIFAI_KEY } from '../config';
import Clarifai from 'clarifai';
import axios from 'axios';
import jwt_decode from 'jwt-decode';

import setAuthToken from '../utils/setAuthToken';

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

export const userSignedOut = () => dispatch => {
  dispatch(updateImageURL(''));
  dispatch(cleanBoxes());
  dispatch({
    type: 'SIGN_OUT'
  });
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

    dispatch(increaseRecords());
  };
};

export const registerUser = (userData, history) => dispatch => {
  axios
    .post('http://localhost:5000/api/users/register', userData)
    .then(res => history.push('/login'))
    .catch(error => {
      console.log(error.data);
      dispatch({
        type: 'GET_ERRORS',
        payload: error.data
      });
    });
};

export const localSignIn = (userData, history) => dispatch => {
  axios
    .post('http://localhost:5000/api/users/login', userData)
    .then(res => {
      // Save to localStorage
      const { token } = res.data;
      // Set token to ls
      localStorage.setItem('jwtToken', token);
      // Set token to Auth header
      setAuthToken(token);
      // Decode token to get user data
      const decoded = jwt_decode(token);
      // Set current user
      history.push('/');
      dispatch(setLocalUser(decoded));
    })
    .catch(err =>
      dispatch({
        type: 'GET_ERRORS',
        payload: err.data
      })
    );
};

export const setLocalUser = decoded => {
  return {
    type: 'SET_LOCAL_USER',
    payload: decoded
  };
};

export const logoutLocalUser = () => dispatch => {
  // Remove token from localStorage
  localStorage.removeItem('jwtToken');
  // Remove auth header for future requests
  setAuthToken(false);
  // Set current user to {} which will set isAuthenticated to false
  dispatch(setLocalUser({}));
  dispatch(updateImageURL(''));
  dispatch(cleanBoxes());
};

export const increaseRecords = () => (dispatch, getState) => {
  const id = getState().auth.localUser.id;
  axios
    .put('http://localhost:5000/api/users/current/increase', { id })
    .then(res => {
      dispatch({
        type: 'INCREASE_RECORDS',
        payload: res.data
      });
    })
    .catch(err =>
      dispatch({
        type: 'GET_ERRORS',
        payload: err.data
      })
    );
};

export const fetchCurrentUser = () => dispatch => {
  axios
    .get('http://localhost:5000/api/users/current')
    .then(res => {
      dispatch({
        type: 'FETCH_USER',
        payload: res.data
      });
    })
    .catch(err =>
      dispatch({
        type: 'GET_ERRORS',
        payload: err.data
      })
    );
};

export const cleanBoxes = () => {
  return {
    type: 'FETCH_BOXES',
    payload: []
  };
};
