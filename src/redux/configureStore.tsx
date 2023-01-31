import { configureStore } from "@reduxjs/toolkit";
import durationSlice from "./durationSlice";
import difficultySlice from "./difficultySlice";
import quizSlice from "./quizSlice";

const store = configureStore({
  reducer: {
    duration: durationSlice.reducer,
    difficulty: difficultySlice.reducer,
    quiz: quizSlice.reducer,
  },
});

export default store;
