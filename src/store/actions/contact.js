import { collection, onSnapshot } from "@firebase/firestore";
import axios from "axios";
import firebase from "../../firebase";
import firebaseDB from "../../firebase";
import { v4 as uuidv4 } from 'uuid';
import { CONTACT_ERROR, SAVE_CONTACT_LIST, CONTACT_LOADING } from "../types";
import { doc, setDoc } from "firebase/firestore"; 


export const getContact = async(dispatch) => {
  try {
    dispatch({ type: CONTACT_LOADING, payload: true });
   
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
    // Add a new contact in collection "contacts"
    await setDoc(doc(firebaseDB, "contacts", uuidv4()), {...data, id: uuidv4()});
    dispatch({ type: CONTACT_LOADING, payload: false });
  } catch (error) {
    dispatch({ type: CONTACT_ERROR, payload: error.message });
  }
};
