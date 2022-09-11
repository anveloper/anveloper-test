import React, { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import {
  selectRoomList,
  selectSocket,
  setRoomList,
  setRoomName,
  setUserName,
} from "../features/game/gameSlice";
import { useNavigate } from "react-router-dom";
import styles from "./GameRoomList.module.css";

const GameRoomList = () => {
  const [newNickname, setNewNickname] = useState("");
  const [newRoomName, setNewRoomName] = useState("");
  const socket = useAppSelector(selectSocket);
  const roomList = useAppSelector(selectRoomList);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    socket.on("connect", () => {
      console.log(socket.id);
    });
    socket.onAny((event: string) => {
      console.log(`SocketIO Event: ${event}`);
    });
    socket.on("init_room", (rooms: []) => {
      dispatch(setRoomList(rooms));
    });
    socket.on("connect_error", () => setTimeout(() => socket.connect(), 5000));
    socket.on("room_change", (rooms: []) => {
      dispatch(setRoomList(rooms));
    });
  }, [dispatch, socket]);

  const handleEnter = (event: React.FormEvent) => {
    event.preventDefault();
    if (!newNickname) {
      alert("닉네임 입력");
      return;
    }
    if (!newRoomName) {
      alert("방이름 입력");
      return;
    }
    dispatch(setUserName(newNickname));
    socket.emit(
      "enter_room",
      newNickname,
      newRoomName,
      (roomName: string, count: number) => {
        navigate(`/game/${roomName}`);
        dispatch(setRoomName(roomName));
      }
    );
  };
  const handleJoin = (joinRoomName: string) => {
    if (!newNickname) {
      alert("닉네임 입력");
      return;
    }
    dispatch(setUserName(newNickname));
    socket.emit(
      "enter_room",
      newNickname,
      joinRoomName,
      (roomName: string, count: number) => {
        navigate(`/game/${roomName}`);
        dispatch(setRoomName(roomName));
      }
    );
  };
  const renderRoomList = () => {
    if (roomList && roomList.length > 0) {
      const result: JSX.Element[] = [];
      for (let i = 0; i < roomList.length; i++) {
        result.push(
          <div
            className={styles.roomName}
            key={`Room ${roomList[i]}`}
            onClick={() => handleJoin(roomList[i])}
          >
            <h4>게임 룸</h4>
            {roomList[i]}
          </div>
        );
      }
      return result;
    } else return <h3>개설된 방이 없습니다.</h3>;
  };

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={handleEnter}>
        <input
          value={newNickname}
          onChange={(e) => setNewNickname(e.target.value)}
          placeholder="닉네임"
        />
        <input
          value={newRoomName}
          onChange={(e) => setNewRoomName(e.target.value)}
          placeholder="방이름"
        />
        <button>입장</button>
      </form>
      <div className={styles.list}>{renderRoomList()}</div>
    </div>
  );
};

export default GameRoomList;
