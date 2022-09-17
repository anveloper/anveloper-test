import React, { useEffect, useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import {
  selectSocket,
  selectAnswer,
  selectRoomName,
  selectMessages,
  setAnswer,
  setMessages,
} from "../gameSlice";
import styles from "./Chat.module.css";
import ChatList from "./ChatList";

const Chat = () => {
  const socket = useAppSelector(selectSocket);
  const roomName = useAppSelector(selectRoomName);
  const answer = useAppSelector(selectAnswer);
  const messages = useAppSelector(selectMessages);
  const [isSubmit, setIsSubmit] = useState(false);
  const lastRef = useRef<HTMLDivElement>(null);
  const [newMessage, setNewMessage] = useState("");

  const dispatch = useAppDispatch();

  useEffect(() => {
    socket.on("new_message", () => {});
    socket.on("send_answer", (answer) => {
      console.log(answer);
    });
    socket.on("new_message", (nickname, msg) => {
      dispatch(setMessages({ type: "other", name: nickname, content: msg }));
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [socket]);

  useEffect(() => {
    lastRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSubmit = () => {
    setIsSubmit(true);
    if (socket) {
      socket.emit("set_answer", roomName, answer);
      // socket.emit("get_answer", roomName);
    }
  };
  const handleModify = () => {
    setIsSubmit(false);
    dispatch(setAnswer(""));
  };

  const handleSend = () => {
    if (socket) {
      socket.emit("new_message", roomName, newMessage, (msg: string) => {
        dispatch(setMessages({ type: "mine", name: "mine", content: msg }));
      });
    }
  };

  return (
    <div>
      <div className={styles.answerContainer}>
        <h5 style={{ display: "inline" }}>문제</h5>
        <input
          disabled={isSubmit}
          value={answer}
          onChange={(e) => {
            dispatch(setAnswer(e.target.value));
          }}
        />
        {!isSubmit ? (
          <button onClick={handleSubmit}>출제</button>
        ) : (
          <button onClick={handleModify}>수정</button>
        )}
      </div>
      <div>
        <ChatList messages={messages} lastRef={lastRef} />
        <input
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
        />
        <button onClick={handleSend}>전송</button>
      </div>
    </div>
  );
};

export default Chat;
