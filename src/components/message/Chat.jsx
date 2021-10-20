import React, { useRef, useState } from "react";
import { ChatMessage } from "./ChatMessage";
import { app } from "../../firebase";
import firebaseDB from "../../firebase";
// import firebase from 'firebase/app';
import "firebase/firestore";
import "firebase/auth";
import { collection, onSnapshot } from "@firebase/firestore";

import { useAuthState } from "react-firebase-hooks/auth";
import { useCollectionData } from "react-firebase-hooks/firestore";

export const Chat = () => {
  const [formValue, setFormValue] = useState("");
  // we will use this to scroll to bottom of chat on page-reload and after sending a message
  const dummy = useRef();

  const scrollToBottom = () => {
    dummy.current.scrollIntoView({ behavior: "smooth" });
  };
  const sendMessage = async (e) => {
    e.preventDefault();
    // gets name, userID and pfp of logged in user
    const { displayName, uid, photoURL } = app.auth().currentUser;

    await messagesRef.add({
      user: displayName,
      body: formValue,
      createdAt: firebaseDB.firestore.FieldValue.serverTimestamp(),
      uid: uid,
      photoURL: photoURL,
    });

    // resetting form value and scrolling to bottom
    setFormValue("");
    dummy.current.scrollIntoView({ behavior: "smooth" });
  };

  // getting the message and sorting them by time of creation
  const messagesRef =  onSnapshot(collection(firebaseDB, "messages"))

  // const messagesRef = firebaseDB.collection("messages");
  const query = messagesRef.orderBy("createdAt", "asc").limitToLast(25);

  const [messages] = useCollectionData(query, { idField: "id" });

  return (
    <div>
      <div>
        {/* we will loop over the message and return a
        ChatMessage component for each message */}
        {messages &&
          messages.map((msg) => <ChatMessage key={msg.id} message={msg} />)}
        <span ref={dummy}></span>
      </div>

      {/* Form to type and submit messages */}
      <form onSubmit={()=>sendMessage()}>
        <input
          value={formValue}
          onChange={(e) => setFormValue(e.target.value)}
          placeholder="Say something"
        />
        <button type="submit" disabled={!formValue}>
          send
        </button>
      </form>
    </div>
  );
};
