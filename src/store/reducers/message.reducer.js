import { MESSAGE_ERROR, MESSAGE_LOADING, SAVE_MESSAGE_LIST } from "../types";

const initialState = {
  messageLoading: false,
  messageErr: "",
  messages: [],
};

export const message = (state = initialState, { type, payload }) => {
  switch (type) {
    case MESSAGE_LOADING:
      return { ...state, messageLoading: payload };
    case SAVE_MESSAGE_LIST:
      return {
        ...state,
        messages: payload,
        messageLoading: false,
        messageErr: "",
      };
    case MESSAGE_ERROR:
      return { ...state, messageLoading: false, messageErr: payload };
    default:
      return state;
  }
};
