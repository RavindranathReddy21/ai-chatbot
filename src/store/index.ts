import { configureStore } from "@reduxjs/toolkit";
import chatReducer from "./chatStore";
import uiReducer from "./uiStore";

export const store = configureStore({
  reducer: {
    chat: chatReducer,
    ui: uiReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;