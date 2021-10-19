import React from "react";

export const ChatMessage = (props) => {
  const { user, body, uid, photoURL, createdAt } = props.message;

  return (
    <>
      <div>
        <img
          src={photoURL || "https://i.imgur.com/rFbS5ms.png"}
          alt="{user}'s pfp"
        />
      </div>
      <div>
        <p>{user}</p>
        <p>{body}</p>
      </div>
    </>
  );
};
