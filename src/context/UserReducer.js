import {
  CHANGE_EMAIL,
  CHANGE_NAME,
  CHANGE_PHONE,
  CHANGE_PASSWORD,
  USER_SIGN_IN,
} from './ReducerConst';
const userState = {
  name: '',
  email: '',
  phone: '',
  password: '',
  is_signed_in: false,
};

const UserReducer = (state, action) => {
  switch (action.type) {
    case CHANGE_NAME:
      return {...state, name: action.payload};
    case CHANGE_PHONE:
      return {...state, phone: action.payload};
    case CHANGE_EMAIL:
      return {...state, email: action.payload};
    case CHANGE_PASSWORD:
      return {...state, password: action.payload};
    case USER_SIGN_IN:
      if (action.payload) {
        return {...state, is_signed_in: action.payload};
      }
      return {...userState, is_signed_in: action.payload};

    default:
      return state;
  }
};
export default UserReducer;
