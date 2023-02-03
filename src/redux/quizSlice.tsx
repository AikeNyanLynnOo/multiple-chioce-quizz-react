import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { shuffleArray } from "../utils/shuffleArray";
import { Answer, Quiz, QuizItem } from "./types";

const initialState = {
  fetch: {
    isLoading: false,
    isError: false,
    message: "",
  },
  count: 5,
  allQuizzes: [],
  currentQuiz: 0,
};

const quizSlice = createSlice({
  name: "quizCount",
  initialState,
  reducers: {
    setIsFetchLoading: (state: Quiz, action: PayloadAction<boolean>) => {
      state.fetch.isLoading = action.payload;
    },
    setIsFetchError: (state: Quiz, action: PayloadAction<boolean>) => {
      state.fetch.isError = action.payload;
    },
    setFetchMessage: (state: Quiz, action: PayloadAction<string>) => {
      state.fetch.message = action.payload;
    },
    setQuizCount: (state: Quiz, action: PayloadAction<number>) => {
      state.count = action.payload;
    },
    setallQuizzes: (state: Quiz, action: PayloadAction<QuizItem[]>) => {
      state.allQuizzes = [...action.payload];
    },
    setShuffledAnswers: (state: Quiz, action: PayloadAction<void>) => {
      state.allQuizzes.forEach((q) => {
        q.shuffledAnswers = shuffleArray([
          ...q.incorrectAnswers,
          q.correctAnswer,
        ]).map((ans, index) => {
          return {
            choice: ["A", "B", "C", "D", "E", "F", "G"][index],
            text: ans,
          };
        });
      });
    },
    updateCurrentQuiz: (state: Quiz, action: PayloadAction<number>) => {
      state.currentQuiz = action.payload;
    },
    updateUserAnswer: (state: Quiz, action: PayloadAction<Answer>) => {
      state.allQuizzes[state.currentQuiz].userAnswer = action.payload;
    },
  },
});

export const quizActions = quizSlice.actions;
export default quizSlice;
