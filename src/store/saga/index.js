import { all } from "redux-saga/effects";
import contactSaga from "./contact.saga";

export default function* rootSaga() {
  yield all([contactSaga.getContactList]);
}
