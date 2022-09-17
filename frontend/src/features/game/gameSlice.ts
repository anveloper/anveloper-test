import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { io, Socket } from "socket.io-client";
import Axios from "axios";

// const baseURL = "http://localhost:5000";
export interface MsgConfig {
  type: "mine" | "other";
  name: string;
  content: string;
}
export interface GameState {
  roomList: [];
  socket: Socket;
  userName: string;
  roomName: string;
  roomCount: number;
  answer: string;
  color: string;
  messages: MsgConfig[];
  status: "idle" | "loading" | "failed";
}

const initialState: GameState = {
  roomList: [],
  socket: io(),
  userName: "",
  roomName: "",
  roomCount: 0,
  answer: "",
  color: "black",
  messages: [],
  status: "idle",
};

export const getRoomList = createAsyncThunk("game/selectRoomList", async () => {
  try {
    const response = await Axios.get("http://localhost:5000/api/roomList");
    return response.data;
  } catch (err) {
    console.log(err);
  }
});

export const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    setRoomList: (state, { payload }: PayloadAction<[]>) => {
      state.roomList = payload;
    },
    setRoomName: (state, { payload }) => {
      state.roomName = payload;
    },
    setUserName: (state, { payload }) => {
      state.userName = payload;
    },
    setAnswer: (state, { payload }) => {
      state.answer = payload;
    },
    setColor: (state, { payload }) => {
      state.color = payload;
    },
    setMessages: (state, { payload: { type, name, content } }) => {
      state.messages.push({ type, name, content });
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getRoomList.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getRoomList.fulfilled, (state, { payload }) => {
        state.status = "idle";
        state.roomList = payload;
      })
      .addCase(getRoomList.rejected, (state) => {
        state.status = "failed";
      });
  },
});

export const {
  setRoomList,
  setRoomName,
  setUserName,
  setAnswer,
  setColor,
  setMessages,
} = gameSlice.actions;
export const selectSocket = (state: RootState) => state.game.socket;
export const selectRoomList = (state: RootState) => state.game.roomList;
export const selectName = (state: RootState) => {
  return { userName: state.game.userName, roomName: state.game.roomName };
};
export const selectRoomName = (state: RootState) => state.game.roomName;
export const selectAnswer = (state: RootState) => state.game.answer;
export const selectColor = (state: RootState) => state.game.color;
export const selectMessages = (state: RootState) => state.game.messages;
export default gameSlice.reducer;
