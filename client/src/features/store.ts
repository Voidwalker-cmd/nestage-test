import { configureStore } from "@reduxjs/toolkit";
import clientReducer from "./client";
import { SITE_MODE } from "../config";
// import clientReducer from "./client";

export const store = configureStore({
  reducer: {
    client: clientReducer,
  },
  devTools: SITE_MODE === "test",
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
