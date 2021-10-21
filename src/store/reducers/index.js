import { combineReducers } from "redux";
import { contact } from "./contact.reducer";
import { message } from "./message.reducer";

export default combineReducers({
  contect: contact,
  message: message,
});
