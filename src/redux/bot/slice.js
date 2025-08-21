import { createSlice } from "@reduxjs/toolkit";
import { getBotStatus, startBot, stopBot } from "./operations";

const slice = createSlice({
  name: "bot",
  initialState: {
    is_active: false,
    isRefreshing: false,
    isLoading: true,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(startBot.pending, (state) => {
        state.isRefreshing = true;
        state.error = null;
      })
      .addCase(startBot.rejected, (state, action) => {
        state.isRefreshing = false;
        state.error = action.payload;
      })
      .addCase(startBot.fulfilled, (state, action) => {
        state.is_active = action.payload.is_active;
        state.isRefreshing = false;
        state.error = null;
      })
      .addCase(stopBot.pending, (state) => {
        state.isRefreshing = true;
        state.error = null;
      })
      .addCase(stopBot.rejected, (state, action) => {
        state.isRefreshing = false;
        state.error = action.payload;
      })
      .addCase(stopBot.fulfilled, (state, action) => {
        state.is_active = action.payload.is_active;
        state.isRefreshing = false;
        state.error = null;
      })
      .addCase(getBotStatus.pending, (state) => {
        state.isRefreshing = true;
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getBotStatus.rejected, (state, action) => {
        state.isRefreshing = false;
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(getBotStatus.fulfilled, (state, action) => {
        state.is_active = action.payload.is_active;
        state.isRefreshing = false;
        state.isLoading = false;
        state.error = null;
      });
  },
});

export default slice.reducer;
