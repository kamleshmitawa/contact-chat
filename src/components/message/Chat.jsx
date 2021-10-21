import React, { useEffect, useRef, useState } from "react";
import { ChatMessage } from "./ChatMessage";
import { app } from "../../firebase";
import firebaseDB from "../../firebase";
// import firebase from 'firebase/app';
import "firebase/firestore";
import "firebase/auth";
import { collection, onSnapshot } from "@firebase/firestore";

import { useAuthState } from "react-firebase-hooks/auth";
import { useCollectionData } from "react-firebase-hooks/firestore";

export const Chat = ({ item }) => {
  const [textInput, settextInput] = useState("");
  // we will use this to scroll to bottom of chat on page-reload and after sending a message
  const dummy = useRef();

  useEffect(() => {
    onSnapshot(collection(firebaseDB, "messages"), (snapshot) => {
      console.log(snapshot, "snapshotsnapshotsnapshot", item);
      let contacts = [];
      snapshot.docs.forEach((doc) => {
        console.log(doc, "docdocdoc");
        contacts.push(doc.data());
      });
    });
  }, []);

  const scrollToBottom = () => {
    dummy.current.scrollIntoView({ behavior: "smooth" });
  };
  const sendMessage = async (e) => {
    e.preventDefault();
    // gets name, userID and pfp of logged in user
    // const { displayName, uid, photoURL } = app.auth().currentUser;

    // await messagesRef.add({
    //   user: displayName,
    //   body: textInput,
    //   createdAt: firebaseDB.firestore.FieldValue.serverTimestamp(),
    //   uid: uid,
    //   photoURL: photoURL,
    // });

    // // resetting form value and scrolling to bottom
    // settextInput("");
    // dummy.current.scrollIntoView({ behavior: "smooth" });
  };

  // getting the message and sorting them by time of creation
  // const messagesRef =  onSnapshot(collection(firebaseDB, "messages"))

  // const messagesRef = firebaseDB.collection("messages");
  // const query = messagesRef.orderBy("createdAt", "asc").limitToLast(25);

  // const [messages] = useCollectionData(query, { idField: "id" });
  const messages = [
    {
      id: 101,
      channelld: 1,
      contactId: "101",
      createdAt: "October 20, 2021 at 12:00:00 AM UTC+5:30",
      sentBy: "kamlesh",
      text: "text message",
      type: "text",
    },
    {
      id: 101,
      channelld: 1,
      contactId: "101",
      createdAt: "October 20, 2021 at 12:00:00 AM UTC+5:30",
      sentBy: "kamleasdadsh",
      text: "text message",
      type: "text",
    },
    {
      id: 101,
      channelld: 1,
      contactId: "101",
      createdAt: "October 20, 2021 at 12:00:00 AM UTC+5:30",
      sentBy: "kamleasdadsh",
      text: "text message",
      type: "text",
    },
    {
      id: 101,
      channelld: 1,
      contactId: "101",
      createdAt: "October 20, 2021 at 12:00:00 AM UTC+5:30",
      sentBy: "kamlesh",
      text: "text message",
      type: "text",
    },
    {
      id: 101,
      channelld: 1,
      contactId: "101",
      createdAt: "October 20, 2021 at 12:00:00 AM UTC+5:30",
      sentBy: "kamleasdadsh",
      text: "text message",
      type: "text",
    },
    {
      id: 101,
      channelld: 1,
      contactId: "101",
      createdAt: "October 20, 2021 at 12:00:00 AM UTC+5:30",
      sentBy: "kamlesh",
      text: "text message",
      type: "text",
    },
    {
      id: 101,
      channelld: 1,
      contactId: "101",
      createdAt: "October 20, 2021 at 12:00:00 AM UTC+5:30",
      sentBy: "kamleasdadsh",
      text: "text message",
      type: "text",
    },
  ];

  return (
    <div className="chat-section">
      <div className="chat-header" > {item?.firstName} </div>
      <div className="chat-box">
        {/* we will loop over the message and return a
        ChatMessage component for each message */}
        {messages &&
          messages?.map((msg) => <ChatMessage key={msg.id} message={msg} />)}
          </div>
      {/* Form to type and submit messages */}
      <div className="text-section">
        <form onSubmit={sendMessage}>
          <input
            value={textInput}
            onChange={(e) => settextInput(e.target.value)}
            placeholder="Say something"
          />
          <button className="send-btn" type="submit" disabled={!textInput}>
            send
          </button>
        </form>
      </div>
    </div>
  );
};
