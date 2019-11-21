import axios from 'axios';

import { GET_SCREENSHOT, GET_SCREENSHOT_SUCCESS, GET_SCREENSHOT_ERROR } from './types';

// Register user
export const generateScreenshot = (url) => dispatch => {
  dispatch(startGenerating());

  axios.post('/api/screenshot', { url: url })
    .then(result => {
      console.log(result);
      dispatch({
        type: GET_SCREENSHOT_SUCCESS,
        payload: result.data
      })
    })
    .catch(error => {
      console.log(error);
      dispatch({
        type: GET_SCREENSHOT_ERROR,
        payload: error
      })
    });
};


// Start loading
export const startGenerating = () => {
  return {
    type: GET_SCREENSHOT
  };
};
