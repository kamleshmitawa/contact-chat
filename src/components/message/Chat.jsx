import React, { useEffect, useRef, useState } from "react";
import "firebase/firestore";
import "firebase/auth";
import { v4 as uuidv4 } from "uuid";
import { useDispatch, useSelector } from "react-redux";
import { addMessage, getMessages } from "../../store/actions/message";
import { ChatMessage } from "./ChatMessage";

export const Chat = ({ item }) => {
  const [textInput, settextInput] = useState("");
  const [messageList, setMessageList] = useState([]);

  const { messages, messageLoading, messageErr } = useSelector(
    ({ message }) => ({
      messages: message.messages,
      messageLoading: message.messageLoading,
      messageErr: message.messageErr,
    })
  );
  const dispatch = useDispatch();
  const dummy = useRef();
  // we will use this to scroll to bottom of chat on page-reload and after sending a message
  
  useEffect(() => {
    if (item?.channelId) {
      getMessages(dispatch, item);
    } else {
      setMessageList([]);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [item]);

  useEffect(() => {
    setMessageList(messages);
  }, [messages]);

  const scrollToBottom = () => {
    console.log(dummy, "kmkmkmkmdummy");
    dummy?.current?.scrollIntoView({ behavior: "smooth" });
  };

  const sendMessage = async (e) => {
    e.preventDefault();
    let data = {
      createdAt: new Date(),
      profileImg:
        "https://images.unsplash.com/photo-1498598457418-36ef20772bb9?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=870&q=80",
      channelld: item?.channelId || uuidv4(),
      contactId: item?.id || null,
      sentBy: "kamlesh",
      sendTo: item?.firstName || "test",
      text: textInput,
      type: "text",
    };
    addMessage(dispatch, data);

    // resetting form value and scrolling to bottom
    settextInput("");
    scrollToBottom();
  };

  // getting the message and sorting them by time of creation
  // const messagesRef = {db}.collection("messages");
  // const query = messagesRef.orderBy("createdAt", "asc").limitToLast(25);

  // const [messages] = useCollectionData(query, { idField: "id" });

  if (messageLoading) {
    return <div>Loading......</div>;
  }
  return (
    <div className="chat-section">
      {messageErr ? (
        <div className="error-msg">{messageErr} </div>
      ) : (
        <React.Fragment />
      )}
      <div className="chat-header"> {item?.firstName} </div>
      <div className="chat-container">
        {/* we will loop over the message and return a
        ChatMessage component for each message */}
        {messageList.length ? (
          messageList?.map((msg) => <ChatMessage key={msg.id} message={msg} />)
        ) : (
          <div className="no-msg">Let's start chat </div>
        )}
        <span ref={dummy} />
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
