import { db } from "../../firebase";
import { v4 as uuidv4 } from "uuid";
import { collection, addDoc, getDocs } from "firebase/firestore";
import { MESSAGE_ERROR, MESSAGE_LOADING, SAVE_MESSAGE_LIST } from "../types";

export const addMessage = async (dispatch, data) => {
  try {
    dispatch({ type: MESSAGE_LOADING, payload: true });
    // Add a new message in collection "messages"
    console.log(data, 'datadatadatadata')
    await addDoc(collection(db, "messages"), { id: uuidv4(), ...data });
    // await addDoc(collection(db, "contacts"), { id: uuidv4(), ...data }); //need to update channelId in contacts
    dispatch({ type: MESSAGE_LOADING, payload: false });
  } catch (error) {
    dispatch({ type: MESSAGE_ERROR, payload: error.message });
  }
};

export const getMessages = async (dispatch, data) => {
  try {
    dispatch({ type: MESSAGE_LOADING, payload: true });
    // Get a messages in collection "messages"
    const querySnapshot = await getDocs(collection(db, "messages"));
    let messages = [];
    querySnapshot.forEach((doc) => {
      messages.push(doc.data());
    });
    dispatch({ type: SAVE_MESSAGE_LIST, payload: messages });
  } catch (error) {
    dispatch({ type: MESSAGE_ERROR, payload: error.message });
  }
};
