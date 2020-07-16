import {
    PRODUCT_GRID_DATA,
    PRODUCT_GRID_DATA_SUCCESS,
    PRODUCT_GRID_DATA_ERROR,
    PRODUCT_GRID_DATA_RESET_REDUCER,
    
  } from "@redux/types";
  
  import { strings } from '@values/strings'
  import axios from 'axios'
  import { urls } from '@api/urls'

  const header = {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'multipart/form-data',
    },
  }
  
  export function showLoadingIndicator(type) {  
    return {
      type: type
    };
  }
  
  
  export function onSuccess(data, type) {
    return {
      data,
      type: type,
    };
  }
  
  export function onFailure(error, type) {
    return {
      type: type,
      error
    };
  }
  
  export function getProductSubCategoryData(data) {
  console.log("getProductSubCategoryData",data);
  
    return dispatch => {
      dispatch(showLoadingIndicator(PRODUCT_GRID_DATA));
  
      axios.post(urls.ProductGrid.url, data, header).then(response => {
          console.log("getProductSubCategoryData", response.data);
          if (response.data.ack ==='1') {
            dispatch(
              onSuccess(response.data, PRODUCT_GRID_DATA_SUCCESS)
            )
          }
          else {
            dispatch(
              onFailure(response.data.msg, PRODUCT_GRID_DATA_ERROR)
            )
          }
        })
        .catch(function (error) {
          console.log("getHomePageData ERROR", error);
  
          dispatch(
            onFailure(strings.serverFailedMsg, PRODUCT_GRID_DATA_ERROR)
          );
        });
    }
  }
  
    