import { TOGGLE_TODO,ADD_KNOWLEDGE } from "../actionTypes";

const initialState = {
  clientId: "111",
  knowledges: [],
  events: [],
  allIds: [],
  byIds: {},
};

export default function (state = initialState, action) {
  switch (action.type) {
    case ADD_KNOWLEDGE: {
    //   const { id, content } = action.payload;
      return {
        ...state,
        knowledges: [
          ...state.knowledges,
          action.payload,
        ],
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
