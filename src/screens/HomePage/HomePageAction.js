import {
    HOMEPAGE_DATA,
    HOMEPAGE_DATA_SUCCESS,
    HOMEPAGE_DATA_ERROR,
    HOMEPAGE_DATA_RESET_REDUCER,
    
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
  
  export function getHomePageData(data) {
  console.log("getHomePageData",data);
  
    return dispatch => {
      dispatch(showLoadingIndicator(HOMEPAGE_DATA));
  
      axios.post(urls.HomePage.url, data, header).then(response => {
          console.log("getHomePageData", response.data);
          if (response.data.ack ==='1') {
            dispatch(
              onSuccess(response.data, HOMEPAGE_DATA_SUCCESS)
            )
          }
          else {
            dispatch(
              onFailure(response.data.msg, HOMEPAGE_DATA_ERROR)
            )
          }
        })
        .catch(function (error) {
          console.log("getHomePageData ERROR", error);
  
          dispatch(
            onFailure(strings.serverFailedMsg, HOMEPAGE_DATA_ERROR)
          );
        });
    }
  }
  
    