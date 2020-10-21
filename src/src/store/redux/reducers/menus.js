import { APP_ROUTER } from "../actionTypes";
import { APP_ROUTE } from "../../constants";


const initialState = {
  chatRoute: APP_ROUTE
};

export default function (state = initialState, action) {
  switch (action.type) {
    case APP_ROUTER: {
      return {
        ...state,
        chatRoute: action.payload
      };
    }
    default:
      return state;
  }
}

