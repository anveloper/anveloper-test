import React from "react";
export interface ChatItemCard {
  type: "mine" | "other";
  name: string;
  content: string;
}

const ChatItem = ({ type, name, content }: ChatItemCard) => {
  if (type === "mine")
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <p> </p>
        <p>{content}</p>
      </div>
    );
  else
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <p>
          {name}: {content}
        </p>
        <p> </p>
      </div>
    );
};

export default ChatItem;
