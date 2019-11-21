import { GET_SCREENSHOT, GET_SCREENSHOT_SUCCESS, GET_SCREENSHOT_ERROR } from '../actions/types';

const initialState = {
  loading: false,
  gotScreenshot: false,
  screenshotPath: ''
}

export default function(state = initialState, action) {
    switch (action.type) {
      case GET_SCREENSHOT:
        return {
          ...state,
          loading: true,
          gotScreenshot: false,
          screenshotPath: ''
        };
      case GET_SCREENSHOT_SUCCESS:
        return {
          ...state,
          loading: false,
          gotScreenshot: action.payload.success,
          screenshotPath: action.payload.screenshot_path
        };
      case GET_SCREENSHOT_ERROR:
        return {
          ...state,
          loading: false,
          gotScreenshot: action.payload.success,
          screenshotPath: ''
        };
      default:
        return state;
    }
}
