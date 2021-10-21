import React from "react";

export const ChatMessage = (props) => {
  const { type, text, sentBy, contactId, channelId, photoURL, createdAt } =
    props.message;
  let msgClass = `chat-message ${sentBy == "kamlesh" ? "my-message" : ""}`;
  let myMsgClass = `chat-box ${sentBy == "kamlesh" ? "my-message-chat" : ""}`;

  return (
    <div className={myMsgClass}>
      <div className={msgClass}>
        <img
          className="profile-img"
          src={photoURL || "https://i.imgur.com/rFbS5ms.png"}
          alt="profile"
        />
        <div className="message">
          {/* <p className="name">{sentBy}</p> */}
          <p>{text}</p>
          {/* <p>{createdAt}</p> */}
        </div>
      </div>
    </div>
  );
};
