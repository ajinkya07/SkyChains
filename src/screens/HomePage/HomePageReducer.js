import {
  HOMEPAGE_DATA,
  HOMEPAGE_DATA_SUCCESS,
  HOMEPAGE_DATA_ERROR,
  HOMEPAGE_DATA_RESET_REDUCER,

} from "@redux/types";


const initialState = {
  isFetching: false,
  error: false,
  errorMsg: "",
  successHomePageVersion: 0,
  errorHomePageVersion: 0,
  homePageData: [],
};

export default function dataReducer(state = initialState, action) {
  switch (action.type) {

    case HOMEPAGE_DATA:
      return {
        ...state,
        isFetching: true
      };

    case HOMEPAGE_DATA_SUCCESS:
      return {
        ...state,
        errorMsg: "",
        isFetching: false,
        homePageData: action.data.data,
        successHomePageVersion: ++state.successHomePageVersion,
        error: false
      };

    case HOMEPAGE_DATA_ERROR:
      return {
        ...state,
        isFetching: false,
        error: true,
        errorMsg: action.error,
        errorHomePageVersion: ++state.errorHomePageVersion
      };

    case HOMEPAGE_DATA_RESET_REDUCER:
      return initialState;


    default:
      return state;
  }
}
