import { useSelector, useDispatch } from "react-redux";
import { MainState } from "../redux/types";
import { quizActions } from "../redux/quizSlice";
import { useNavigate } from "react-router-dom";

// FRAMER STYLES
import { motion, AnimatePresence } from "framer-motion";
import { quizItemVariants } from "../styles/framerStyles";
export const QuizDisplay = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const quiz = useSelector((state: MainState) => state.quiz);
  const duration = useSelector((state: MainState) => state.duration);
  return (
    <AnimatePresence>
      <motion.div
        variants={quizItemVariants}
        key={quiz.currentQuiz}
        initial={
          quiz.currentDirection === 1 ? "toRight_initial" : "toLeft_initial"
        }
        animate={
          quiz.currentDirection === 1 ? "toRight_animate" : "toLeft_animate"
        }
        exit={quiz.currentDirection === 1 ? "toRight_exit" : "toLeft_exit"}
        className="max-h-[60vh] sm:max-h-[90vh] overflow-y-scroll no-scrollbar absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full sm:w-9/12 lg:w-8/12 xl:w-7/12 2xl:w-5/12 border-x-0 border-y rounded-0 sm:border border-[#FF165D] sm:rounded-md pb-6 px-2 sm:px-5"
      >
        <div className="flex sticky top-0 bg-[#160040] justify-between items-center py-4 px-2 sm:px-0 border-b border-b-[#FFFFFF]">
          <span className="text-[#FF165D] text-lg mr-8">
            Question No. {quiz.currentQuiz + 1}
          </span>
          <span className="text-right text-white">
            {quiz.allQuizzes[quiz.currentQuiz]?.question}
          </span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-3 gap-y-5 sm:gap-y-8 mt-7">
          {quiz.allQuizzes[quiz.currentQuiz]?.shuffledAnswers.map(
            (answer, index) => (
              <div
                key={index}
                onClick={() => {
                  if (duration.timeLeft <= 0) {
                    return;
                  }
                  dispatch(quizActions.updateUserAnswer(answer));
                }}
                className={`cursor-pointer flex flex-col items-center border border-[#FF165D] rounded-md py-3 group ${
                  quiz.allQuizzes[quiz.currentQuiz].userAnswer?.text ===
                  answer.text
                    ? "bg-[#FF165D]"
                    : ""
                }`}
              >
                <span className="text-white mb-3">{answer.choice}.</span>
                <p
                  className={` ${
                    quiz.allQuizzes[quiz.currentQuiz].userAnswer?.text ===
                    answer.text
                      ? "text-[#FFFFFF]"
                      : "text-[#FF165D]"
                  } text-lg font-semibold`}
                >
                  {answer.text}
                </p>
              </div>
            )
          )}
        </div>
        {(quiz.allQuizzes.every((quiz) => quiz.userAnswer) && (
          <button
            className="w-full bg-[#FF165D] text-white text-lg py-2 rounded-lg hidden sm:block mt-5"
            onClick={() => {
              navigate("/results");
            }}
          >
            See Results
          </button>
        )) || (
          <div className="hidden sm:flex justify-between items-center mt-5">
            <button
              className="w-full mb-3 sm:mb-0 mr-5 bg-[#FF165D] text-white text-lg py-2 rounded-lg"
              onClick={() => {
                if (duration.timeLeft <= 0) {
                  return;
                }
                dispatch(quizActions.setCurrentDirection(-1));
                dispatch(
                  quizActions.updateCurrentQuiz(
                    quiz.currentQuiz > 0
                      ? quiz.currentQuiz - 1
                      : quiz.allQuizzes.length - 1
                  )
                );
              }}
            >
              Previous Quiz
            </button>
            <button
              className="w-full bg-[#FF165D] text-white text-lg py-2 rounded-lg"
              onClick={() => {
                if (duration.timeLeft <= 0) {
                  return;
                }
                dispatch(quizActions.setCurrentDirection(1));
                dispatch(
                  quizActions.updateCurrentQuiz(
                    quiz.currentQuiz < quiz.allQuizzes.length - 1
                      ? quiz.currentQuiz + 1
                      : 0
                  )
                );
              }}
            >
              Next Quiz
            </button>
          </div>
        )}
      </motion.div>
    </AnimatePresence>
  );
};
