import isEmpty from '../utils/isEmpty';

const INTIAL_STATE = {
  isSignedIn: null, //this is google OAuth status
  userId: null, //this is google account id from google OAuth
  localUserSignedIn: null,
  localUser: {}
};

export default (state = INTIAL_STATE, action) => {
  switch (action.type) {
    case 'SIGN_IN':
      return { ...state, isSignedIn: true, userId: action.payload };
    case 'SIGN_OUT':
      return { ...state, isSignedIn: false, userId: null };
    case 'SET_LOCAL_USER':
      return {
        ...state,
        localUserSignedIn: !isEmpty(action.payload),
        localUser: action.payload
      };
    case 'INCREASE_RECORDS':
      return {
        ...state,
        localUser: action.payload
      };
    case 'FETCH_USER':
      return {
        ...state,
        localUser: action.payload
      };
    default:
      return state;
  }
};
