import React from "react";
import ChatItem, { ChatItemCard } from "./ChatItem";

export interface ChatListConfig {
  messages: ChatItemCard[];
  lastRef: React.RefObject<HTMLDivElement>;
}

const ChatList = ({ messages, lastRef }: ChatListConfig) => {
  const messageList: ChatItemCard[] = messages ?? [];
  return (
    <div>
      {messageList.map((message, index) => {
        return (
          <ChatItem
            key={index}
            type={message.type}
            name={message.name}
            content={message.content}
          />
        );
      })}
    </div>
  );
};

export default ChatList;
