import { CONTACT_ERROR, CONTACT_LOADING, SAVE_CONTACT_LIST } from "../types";

const initialState = {
  contactLoading: false,
  contactErr: "",
  contacts: [],
};

export const contact = (state = initialState, { type, payload }) => {
  switch (type) {
    case CONTACT_LOADING:
      return { ...state, contactLoading: payload };
    case SAVE_CONTACT_LIST:
      return { ...state, contacts: payload, contactLoading: false, contactErr: "" };
    case CONTACT_ERROR:
      return { ...state, contactLoading: false, contactErr: payload };
    default:
      return state;
  }
};
