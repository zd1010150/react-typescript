import { HTTP_ACTION_DOING, HTTP_ACTION_DONE, HTTP_ACTION_ERROR } from '../../../../store/http/constants';



export const pageLoading = (state = {
  isShow: false,
}, action:any) => {
  const { type } = action;
  switch (type) {
    case HTTP_ACTION_DOING:
      return Object.assign({}, state, { isShow: true });
    case HTTP_ACTION_DONE:
    case HTTP_ACTION_ERROR:
      return Object.assign({}, state, { isShow: false });
    default:
      return state;
  }
};

