import { TOGGLE_TODO, ADD_MESSAGE, SET_CLIENT_DATA, SET_MESSAGES, SET_CLIENTS_LIST, SET_CLIENT_ID } from "../actionTypes";

const initialState = {
  clientId: "111",
  clientData: {},
  onChatClientID: '',
  messages: [],
  clientsList: [],
  allIds: [],
  byIds: {},
};

export default function (state = initialState, action) {
  switch (action.type) {
    case ADD_MESSAGE: {
      return {
        ...state,
        messages: [
          ...state.messages,
          action.payload,
        ],
      };
    }
    case SET_CLIENT_DATA: {
      const payload = (typeof action.payload === 'object' && action.payload !== null) ? action.payload : {};
      return {
        ...state,
        clientData: payload,
      };
    }
    case SET_MESSAGES: {
      const payload = Array.isArray(action.payload) ? action.payload : [];
      return {
        ...state,
        messages: payload,
      };
    }
    case SET_CLIENT_ID: {
      return {
        ...state,
        clientId: action.payload,
      };
    }
    case SET_CLIENTS_LIST: {
      return {
        ...state,
        clientsList: action.payload,
      };
    }

    case TOGGLE_TODO: {
      const { id } = action.payload;
      return {
        ...state,
        byIds: {
          ...state.byIds,
          [id]: {
            ...state.byIds[id],
            completed: !state.byIds[id].completed,
          },
        },
      };
    }
    default:
      return state;
  }
}
