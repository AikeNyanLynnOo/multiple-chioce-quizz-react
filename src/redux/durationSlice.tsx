import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { DurationState } from "./types";

const durationSlice = createSlice({
  name: "duration",
  initialState: {
    timer: null,
    timeUp: 180,
    timeLeft: 180,
  },
  reducers: {
    setTimer: (state: DurationState, action: PayloadAction<any>) => {
      state.timer = action.payload;
    },
    setTimeUp: (state: DurationState, action: PayloadAction<number>) => {
      state.timeUp = action.payload;
      state.timeLeft = action.payload;
    },
    updateTimeLeft: (state: DurationState, action: PayloadAction<void>) => {
      if (state.timeLeft <= 0) {
        clearInterval(state.timer);
        return;
      }
      state.timeLeft -= 0.01;
    },
  },
});
export const durationActions = durationSlice.actions;
export default durationSlice;
