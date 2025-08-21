import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

axios.defaults.baseURL = "https://twitch-bot-api-u5nh.onrender.com";

export const startBot = createAsyncThunk(
  "bot/start",
  async (data, thunkApi) => {
    try {
      const response = await axios.post("/api/bot/start", data);
      return response.data;
    } catch (error) {
      const errorMessage =
        error.response && error.response.data
          ? error.response.data.message
          : error.message;
      return thunkApi.rejectWithValue(errorMessage);
    }
  }
);

export const stopBot = createAsyncThunk("bot/stop", async (_, thunkApi) => {
  try {
    const response = await axios.post("/api/bot/stop");
    return response.data;
  } catch (error) {
    const errorMessage =
      error.response && error.response.data
        ? error.response.data.message
        : error.message;
    return thunkApi.rejectWithValue(errorMessage);
  }
});

export const getBotStatus = createAsyncThunk(
  "bot/status",
  async (_, thunkApi) => {
    try {
      const response = await axios.get("/api/bot/status");
      return response.data;
    } catch (error) {
      const errorMessage =
        error.response && error.response.data
          ? error.response.data.message
          : error.message;
      return thunkApi.rejectWithValue(errorMessage);
    }
  }
);
