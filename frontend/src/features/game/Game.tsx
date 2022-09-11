import React, { useEffect } from "react";
import { useAppSelector } from "../../app/hooks";
import { selectSocket, selectName } from "./gameSlice";
import { useNavigate } from "react-router-dom";
import styles from "./Game.module.css";
import Canvas from "./canvas/Canvas";
import Chat from "./chat/Chat";

const Game = () => {
  const socket = useAppSelector(selectSocket);
  const { userName, roomName } = useAppSelector(selectName);
  const navigate = useNavigate();
  useEffect(() => {
    socket.on("", () => {});
  }, [socket]);

  const handleLeave = () => {
    socket.emit("leave_room", roomName, () => {
      navigate('/game');
    });
  }
  return (
    <div>
      <div className={styles.header}>
        <div className={styles.title}>
          <h3>
            Room <p style={{ color: "blue" }}>{roomName}</p>
          </h3>
          <h5>
            내 이름 : <p style={{ color: "pink" }}>{userName}</p>
          </h5>
        </div>
        <button onClick={handleLeave}>나가기</button>
      </div>
      <div className={styles.content}>
        <Canvas/>
        <Chat/>
      </div>
    </div>
  );
};

export default Game;
