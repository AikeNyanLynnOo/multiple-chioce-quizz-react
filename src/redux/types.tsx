export interface QuizItem {
  category: string;
  id: string;
  correctAnswer: string;
  incorrectAnswers: string[];
  question: string;
  tags: string[];
  type: string;
  difficulty: string;
  regions: string;
  isNiche: boolean;
}
export interface Quiz {
  fetchErrors: string | null;
  count: number;
  allQuizzes: QuizItem[];
  currentQuiz: number;
  userAnswers: string[];
}

export interface MainState {
  duration: {
    timeUp: number;
    timeLeft: number;
  };
  difficulty: {
    value: string;
  };
  quiz: Quiz;
}

export interface DurationState {
  timeUp: number;
  timeLeft: number;
}
