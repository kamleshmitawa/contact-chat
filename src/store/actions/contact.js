import { db } from "../../firebase";
import { v4 as uuidv4 } from "uuid";
import { CONTACT_ERROR, SAVE_CONTACT_LIST, CONTACT_LOADING } from "../types";
import { collection, addDoc, getDocs } from "firebase/firestore";

export const getContact = async (dispatch) => {
  try {
    dispatch({ type: CONTACT_LOADING, payload: true });
    // Get contacts in collection "contacts"
    const querySnapshot = await getDocs(collection(db, "contacts"));
    let contacts = [];
    querySnapshot.forEach((doc) => {
      contacts.push(doc.data());
    });
    dispatch({ type: SAVE_CONTACT_LIST, payload: contacts });
  } catch (error) {
    dispatch({ type: CONTACT_ERROR, payload: error.message });
  }
};

export const addContact = async (dispatch, data) => {
  try {
    dispatch({ type: CONTACT_LOADING, payload: true });
    // Add a new contact in collection "contacts"
    await addDoc(collection(db, "contacts"), {
      contactId: uuidv4(),
      channelId: null,
      ...data,
    });
    getContact(dispatch)
    dispatch({ type: CONTACT_LOADING, payload: false });
  } catch (error) {
    dispatch({ type: CONTACT_ERROR, payload: error.message });
  }
};
