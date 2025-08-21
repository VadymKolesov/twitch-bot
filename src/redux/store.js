import { configureStore } from "@reduxjs/toolkit";
import botReducer from "./bot/slice.js";

export const store = configureStore({
  reducer: {
    bot: botReducer,
  },
});
