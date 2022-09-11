import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import { getDefaultMiddleware } from "@reduxjs/toolkit";
import counterReducer from '../features/counter/counterSlice';
import gameReducer from '../features/game/gameSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    game: gameReducer
  },
  // 이게 최선인가.. 
  middleware: getDefaultMiddleware({
    serializableCheck: false,
  }),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
