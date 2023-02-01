import { configureStore } from "@reduxjs/toolkit";
import durationSlice from "./durationSlice";
import difficultySlice from "./difficultySlice";
import quizSlice from "./quizSlice";
import { modalSlice } from "./modalSlice";

const store = configureStore({
  reducer: {
    duration: durationSlice.reducer,
    difficulty: difficultySlice.reducer,
    quiz: quizSlice.reducer,
    modal: modalSlice.reducer,
  },
});

export default store;
