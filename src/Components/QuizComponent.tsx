import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { MainState } from "../redux/types";
import { Snackbar } from "@mui/material";
import AppsIcon from "@mui/icons-material/Apps";
import CloseIcon from "@mui/icons-material/Close";
import { motion } from "framer-motion";
import { gridDrawerVariants } from "../styles/framerStyles";
import { quizActions } from "../redux/quizSlice";

// MY COMPONENTS
import { QuizDisplay } from "./QuizDisplayComponent";
import { durationActions } from "../redux/durationSlice";

const SnackbarAction = (
  <Link to="/results" className="text-[#FF165D] mr-2">
    See Results
  </Link>
);

function formatSecondsToHHMMSS(duration: number) {
  // Hours, minutes and seconds
  const hrs = ~~(duration / 3600);
  const mins = ~~((duration % 3600) / 60);
  const secs = ~~duration % 60;

  // Output like "1:01" or "4:03:59" or "123:03:59"
  let ret = "";

  if (hrs > 0) {
    ret += "" + hrs + ":" + (mins < 10 ? "0" : "");
  }

  ret += "" + mins + ":" + (secs < 10 ? "0" : "");
  ret += "" + secs;

  return ret;
}

export const Quiz = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const quiz = useSelector((state: MainState) => state.quiz);
  const duration = useSelector((state: MainState) => state.duration);
  const [drawerOpen, setDrawerOpen] = useState<null | boolean>(null);

  useEffect((): any => {
    if (!quiz.allQuizzes.length) {
      navigate("/", { replace: true });
    }
  }, [navigate, quiz]);
  const finishQuiz = () => {
    // stop timer
    dispatch(durationActions.clearTimer());
    // go to results page
    navigate("/results");
  };

  return (
    <div className="bg-[#160040] h-auto min-h-screen text-[#FF165D] text-center">
      {/* snack bar */}

      <div className="hidden sm:block">
        <Snackbar
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
          open={duration.timeLeft <= 0 ? true : false}
          onClose={() => {
            // do nothing (no close)
          }}
          message="Time Up!"
          action={SnackbarAction}
        />
      </div>
      <div className="block sm:hidden">
        <Snackbar
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
          open={duration.timeLeft <= 0 ? true : false}
          onClose={() => {
            // do nothing (no close)
          }}
          message="Time Up!"
          action={SnackbarAction}
        />
      </div>

      <div
        className="h-2 bg-[#FF165D] transition-all duration-150 ease-out"
        style={{ width: `${(duration.timeLeft / duration.timeUp) * 100}%` }}
      ></div>
      <span className="hidden sm:block absolute top-2 right-1 border border-[#FF165D] rounded-md py-3 px-2">
        Time Left - {formatSecondsToHHMMSS(duration.timeLeft)}
      </span>

      {!drawerOpen && (
        <AppsIcon
          sx={{
            fontSize: 40,
            border: "1px solid #FF165D",
            borderRadius: 1,
            padding: 0.5,
            boxSizing: "content-box",
          }}
          className="absolute top-2 left-1 cursor-pointer z-10"
          onClick={() =>
            setDrawerOpen(drawerOpen === null ? true : !drawerOpen)
          }
        />
      )}

      <motion.div
        variants={gridDrawerVariants}
        initial={drawerOpen === null ? "close" : drawerOpen ? "close" : "open"}
        animate={drawerOpen === null ? "" : drawerOpen ? "open" : "close"}
        className="border relative z-10 bg-[#160040] border-[#FF165D] rounded-md pt-4  pb-4 px-3 md:px-5 mx-auto sm:mr-auto sm:ml-0 w-11/12 sm:w-5/12 lg:w-4/12 xl:w-3/12 2xl:w-52"
      >
        <div className="flex justify-between items-center">
          <span className="text-[#FF165D] font-semibold text-lg">
            My Quizzes
          </span>
          <CloseIcon
            className="cursor-pointer"
            sx={{ fontSize: 40 }}
            onClick={() =>
              setDrawerOpen(drawerOpen === null ? false : !drawerOpen)
            }
          />
        </div>
        <div className="block sm:hidden border border-[#FF165D] rounded-md py-3 px-2 mt-5">
          Time Left - {formatSecondsToHHMMSS(duration.timeLeft)}
        </div>
        <div className="border border-[#FF165D] rounded-md py-3 px-2 mt-5">
          Already Answered -{" "}
          {quiz.allQuizzes.filter((q) => q.userAnswer).length}/
          {quiz.allQuizzes.length}
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 my-10">
          {quiz.allQuizzes.map((quiz, index) => (
            <span
              key={index}
              onClick={() => {
                dispatch(quizActions.updateCurrentQuiz(index));
              }}
              className={`cursor-pointer text-center text-lg py-2 px-0 sm:px-3 ${
                quiz.userAnswer
                  ? "bg-[#FF165D] text-[#FFFFFF]"
                  : "bg-[#FFFFFF] text-[#FF165D]"
              } rounded-lg`}
            >
              {index + 1}
            </span>
          ))}
        </div>
        <button
          className="w-full bg-[#FF165D] text-white text-lg py-2 rounded-lg"
          onClick={finishQuiz}
        >
          Finish My Test
        </button>
      </motion.div>
      <QuizDisplay />
      <div className="flex w-full px-2 absolute bottom-0 left-1/2 -translate-x-1/2 sm:hidden sm:flex justify-between items-center mt-5">
        <button
          className="w-full mr-5 bg-[#FF165D] text-white text-lg py-2 rounded-lg"
          onClick={() => {
            if (duration.timeLeft <= 0) {
              return;
            }
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
    </div>
  );
};
