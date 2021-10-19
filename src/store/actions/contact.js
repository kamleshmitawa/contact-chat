import { collection, onSnapshot } from "@firebase/firestore";
import axios from "axios";
import firebase from "../../firebase";
import firebaseDB from "../../firebase";
import { CONTACT_ERROR, SAVE_CONTACT_LIST, CONTACT_LOADING } from "../types";

export const getContact = async(dispatch) => {
  try {
    dispatch({ type: CONTACT_LOADING, payload: true });
   let rrr =  await axios.get(
      "https://contacts-chat-default-rtdb.firebaseio.com/contactform.json"
      
    );
    console.log(rrr, 'mkmkmkmk')
    onSnapshot(collection(firebaseDB, "contacts"), (snapshot) => {
      let contacts = [];
      snapshot.docs.forEach((doc) => {
        contacts.push(doc.data());
      });
      dispatch({ type: SAVE_CONTACT_LIST, payload: contacts });
    });
  } catch (error) {
    dispatch({ type: CONTACT_ERROR, payload: error.message });
  }
};

export const addContact = async (dispatch, data) => {
  try {
    dispatch({ type: CONTACT_LOADING, payload: true });
    await axios.post(
      "https://contacts-chat-default-rtdb.firebaseio.com/contactform.json",
      data
    );
  } catch (error) {
    dispatch({ type: CONTACT_ERROR, payload: error.message });
  }
};
