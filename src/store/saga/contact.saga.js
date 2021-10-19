import { collection, onSnapshot } from "@firebase/firestore";
import { call, put, takeLatest,takeEvery } from "redux-saga/effects";
import firebaseDB from "../../firebase";
import { FETCH_CONTACT_LIST, SAVE_CONTACT_LIST } from "../types";

function* fetchContacts(action) {
  try {
    let contacts = [];
   onSnapshot(collection(firebaseDB, "contacts"), (snapshot) => {
        snapshot.docs.forEach((doc) => {
          contacts.push(doc.data());
        });
      })

    // const res = yield call(() =>
    //   onSnapshot(collection(firebaseDB, "contacts"), (snapshot) => {
    //     snapshot.docs.forEach((doc) => {
    //       contacts.push(doc.data());
    //     });
    //   })
    // );
    console.log( "resresresres", contacts);
    yield put({ type: SAVE_CONTACT_LIST, payload: contacts });
  } catch (error) {}
}

function* getContacts() {
  yield takeEvery(FETCH_CONTACT_LIST, fetchContacts);
}

const contactSaga = {
  getContactList: getContacts(),
};

export default contactSaga;
