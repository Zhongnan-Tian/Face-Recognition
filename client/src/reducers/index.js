import { combineReducers } from 'redux';

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

const imageSizeReducer = (state = [], action) => {
  switch (action.type) {
    case 'UPDATE_SIZE':
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
  boxes: imageSizeReducer
});
