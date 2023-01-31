import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Quiz, QuizItem } from "./types";

const quizSlice = createSlice({
  name: "quizCount",
  initialState: {
    fetchErrors: null,
    count: 5,
    allQuizzes: [],
    currentQuiz: 0,
    userAnswers: [],
  },
  reducers: {
    setQuizCount: (state: Quiz, action: PayloadAction<number>) => {
      state.count = action.payload;
    },
    setallQuizzes: (state: Quiz, action: PayloadAction<QuizItem[]>) => {
      state.allQuizzes = [...action.payload];
    },
    updateCurrentQuiz: (state: Quiz, action: PayloadAction<number>) => {
      state.currentQuiz = action.payload;
    },
  },
});

export const quizActions = quizSlice.actions;
export default quizSlice;
