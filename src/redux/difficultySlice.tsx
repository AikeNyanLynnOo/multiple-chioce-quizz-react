import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export const difficultySlice = createSlice({
  name: "difficulty",
  initialState: {
    value: "easy",
  },
  reducers: {
    setDifficulty: (
      state: { value: string },
      action: PayloadAction<string>
    ) => {
      state.value = action.payload;
    },
  },
});

export const difficultyActions = difficultySlice.actions;
export default difficultySlice;
