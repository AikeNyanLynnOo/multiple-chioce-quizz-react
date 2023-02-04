export interface Answer {
  choice: string;
  text: string;
}

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
  userAnswer: Answer | null;
  shuffledAnswers: Answer[];
}
export interface Quiz {
  fetch: {
    isLoading: boolean;
    isError: boolean;
    message: string;
  };
  count: number;
  allQuizzes: QuizItem[];
  currentQuiz: number;
  currentDirection: number;
}

export interface DurationState {
  timer: any;
  timeUp: number;
  timeLeft: number;
}

export interface ModalState {
  isOpen: boolean;
  message: string;
}

export interface MainState {
  duration: DurationState;
  difficulty: {
    value: string;
  };
  quiz: Quiz;
  modal: ModalState;
}
