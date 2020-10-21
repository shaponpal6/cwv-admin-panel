import {
  ADD_TODO,
  TOGGLE_TODO,
  SET_FILTER,
  APP_ROUTER,
  ADD_MESSAGE,
  SET_CLIENT_DATA,
  SET_MESSAGES,
  SET_CLIENT_ID,
  SET_CLIENTS_LIST,
  SET_SHORT_NOTES,
  SET_OPERATORS,
  ADD_KNOWLEDGE,
} from "./actionTypes";

let nextTodoId = 0;

export const addTodo = (content) => ({
  type: ADD_TODO,
  payload: {
    id: ++nextTodoId,
    content,
  },
});

export const toggleTodo = (id) => ({
  type: TOGGLE_TODO,
  payload: { id },
});

export const setFilter = (filter) => ({
  type: SET_FILTER,
  payload: { filter },
});

export const setMenuState = (menu) => ({
  type: APP_ROUTER,
  payload: menu,
});

export const addMessage = (message) => ({
  type: ADD_MESSAGE,
  payload: message
});

export const setClientData = (data) => ({
  type: SET_CLIENT_DATA,
  payload: data
});

export const setMessages = (message) => ({
  type: SET_MESSAGES,
  payload: message
});
export const setClientID = (clientID) => ({
  type: SET_CLIENT_ID,
  payload: clientID,
});
export const setShortNotes = (notes) => ({
  type: SET_SHORT_NOTES,
  payload: notes,
});
export const setOperators = (operators) => ({
  type: SET_OPERATORS,
  payload: operators,
});
export const setClientsList = (content) => ({
  type: SET_CLIENTS_LIST,
  payload: content,
});

export const addKnowledge = (content) => ({
  type: ADD_KNOWLEDGE,
  payload: content,
});
