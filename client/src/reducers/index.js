import { combineReducers } from 'redux';

import authReducer from './authReducer';

// const INITIAL_STATE = {
//   url: '',
//   height: '',
//   width: ''
// };

const imageURLReducer = (state = '', action) => {
  switch (action.type) {
    case 'UPDATE_URL':
      return action.payload;
    default:
      return state;
  }
};

const imageBoxReducer = (state = [], action) => {
  switch (action.type) {
    case 'FETCH_BOXES':
      // const newState = {
      //   ...state,
      //   height: action.payload.height,
      //   width: action.payload.width
      // };
      // //console.log(newState);
      return action.payload;
    default:
      return state;
  }
};

export default combineReducers({
  imageURL: imageURLReducer,
  boxes: imageBoxReducer,
  auth: authReducer
});
