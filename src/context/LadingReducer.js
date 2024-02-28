import {IS_STARTUP, LOADING} from './ReducerConst';

const LoadingReducer = (state, action) => {
  switch (action.type) {
    case LOADING:
      return {...state, is_loading: action.payload};
    case IS_STARTUP:
      return {...state, apps_loaded: action.payload};
    default:
      return state;
  }
};
export default LoadingReducer;
