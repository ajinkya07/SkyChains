import {
  PRODUCT_GRID_DATA,
  PRODUCT_GRID_DATA_SUCCESS,
  PRODUCT_GRID_DATA_ERROR,
  PRODUCT_GRID_DATA_RESET_REDUCER,
  
} from "@redux/types";


const initialState = {
  isFetching: false,
  error: false,
  errorMsg: "",
  successProductGridVersion: 0,
  errorProductGridVersion: 0,
  productGridData: [],
};

export default function dataReducer(state = initialState, action) {
  switch (action.type) {

    case PRODUCT_GRID_DATA:
      return {
        ...state,
        isFetching: true
      };

    case PRODUCT_GRID_DATA_SUCCESS:
      return {
        ...state,
        errorMsg: "",
        isFetching: false,
        productGridData: action.data.data,
        successProductGridVersion: ++state.successProductGridVersion,
        error: false
      };

    case PRODUCT_GRID_DATA_ERROR:
      return {
        ...state,
        isFetching: false,
        error: true,
        errorMsg: action.error,
        errorProductGridVersion: ++state.errorProductGridVersion
      };

    case PRODUCT_GRID_DATA_RESET_REDUCER:
      return initialState;


    default:
      return state;
  }
}
