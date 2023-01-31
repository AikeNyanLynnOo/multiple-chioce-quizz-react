import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { DurationState } from "./types";

const durationSlice = createSlice({
  name: "duration",
  initialState: {
    timeUp: 180,
    timeLeft: 180,
  },
  reducers: {
    setTimeUp: (state: DurationState, action: PayloadAction<number>) => {
      state.timeUp = action.payload;
      state.timeLeft = action.payload;
    },
    updateTimeLeft: (state: DurationState, action: PayloadAction<void>) => {
      state.timeLeft -= 1;
    },
  },
});
export const durationActions = durationSlice.actions;
export default durationSlice;
