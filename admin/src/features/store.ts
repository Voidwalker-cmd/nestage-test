import { configureStore } from "@reduxjs/toolkit";
import adminReducer from "./admin";
import { SITE_MODE } from "../config";
// import adminReducer from "./admin";

export const store = configureStore({
  reducer: {
    admin: adminReducer,
  },
  devTools: SITE_MODE === "test",
});


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;