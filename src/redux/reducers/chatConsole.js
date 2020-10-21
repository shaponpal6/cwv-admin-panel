import { TOGGLE_TODO, ADD_MESSAGE, SET_CLIENT_DATA, SET_MESSAGES, SET_CLIENTS_LIST, SET_CLIENT_ID, SET_SHORT_NOTES, SET_OPERATORS } from "../actionTypes";

const initialState = {
  clientId: "",
  clientData: {},
  shortNots: {},
  operators: {},
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
    case SET_SHORT_NOTES: {
      const payload = (typeof action.payload === 'object' && action.payload !== null) ? action.payload : {};
      return {
        ...state,
        shortNots: payload,
      };
    }
    case SET_OPERATORS: {
      const payload = (typeof action.payload === 'object' && action.payload !== null) ? action.payload : {};
      return {
        ...state,
        operators: payload,
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
