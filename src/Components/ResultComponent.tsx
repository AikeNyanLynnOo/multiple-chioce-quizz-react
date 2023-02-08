import { useSelector } from "react-redux";
import { MainState } from "../redux/types";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
import CancelIcon from "@mui/icons-material/Cancel";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { durationActions } from "../redux/durationSlice";
import { useDispatch } from "react-redux";

export const Result = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const quiz = useSelector((state: MainState) => state.quiz);

  useEffect((): any => {
    // console.log(quiz.allQuizzes.length);
    if (!quiz.allQuizzes.length) {
      navigate("/", { replace: true });
    }
  }, [navigate, quiz]);
  return (
    <div className="bg-[#160040] min-h-screen max-h-screen h-auto py-10 overflow-y-scroll">
      <div className="mx-auto w-11/12 sm:w-9/12 lg:w-8/12 xl:w-7/12 2xl:w-5/12">
        <h1 className="text-[#FF165D] text-3xl font-semibold text-center px-2">
          Here are the results!
        </h1>
        <div className="block text-center sm:flex justify-between items-center my-8">
          <p className="text-[#FF165D]">
            {" "}
            {quiz.allQuizzes.filter((q) => q.userAnswer).length}/
            {quiz.allQuizzes.length} {" Questions answered!"}
          </p>
          <p className="text-white">
            You Score {" - "}
            {
              quiz.allQuizzes.filter(
                (q) => q.userAnswer?.text === q.correctAnswer
              ).length
            }
            /{quiz.allQuizzes.length}
          </p>
        </div>
        <div className="mb-10">
          {quiz.allQuizzes.map((q, quizIndex) => (
            <Accordion key={quizIndex}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <div className="flex w-full">
                  <span className="text-lg font-semibold rounded-lg text-center text-[#FF165D]">
                    {quizIndex + 1}.
                  </span>
                  <span className="ml-5 hover:text-[#FF165D] font-semibold text-lg">
                    {q.question}
                  </span>
                </div>
              </AccordionSummary>
              <AccordionDetails>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-3 gap-y-5 sm:gap-y-8 ">
                  {q.shuffledAnswers.map((answer, index) => (
                    <div
                      key={index}
                      className={`${
                        q.userAnswer?.text === answer.text
                          ? "text-[#FFFFFF] bg-[#FF165D]"
                          : "text-[#FF165D]"
                      } flex justify-between border border-[#FF165D] rounded-md py-3 px-2 sm:px-5`}
                    >
                      <span>{answer.choice}.</span>
                      <span>{answer.text}</span>
                      {(q.correctAnswer === answer.text && (
                        <TaskAltIcon sx={{ color: "#03C988" }} />
                      )) || <CancelIcon />}
                    </div>
                  ))}
                </div>
                <p className="italic text-lg">
                  The correct answer is{" =>"}
                  <span className="ml-5 text-[#FF165D]">
                    {"("}
                    {
                      q.shuffledAnswers.filter(
                        (ans) => ans.text === q.correctAnswer
                      )[0].choice
                    }
                    {")"}
                  </span>
                  <span className="ml-5 text-[#FF165D]">
                    {
                      q.shuffledAnswers.filter(
                        (ans) => ans.text === q.correctAnswer
                      )[0].text
                    }
                  </span>
                </p>
              </AccordionDetails>
            </Accordion>
          ))}
        </div>
        <button
          className="w-full bg-[#FF165D] text-white text-lg py-2 rounded-lg"
          onClick={() => {
            dispatch(durationActions.setTimer(null));
            navigate("/");
          }}
        >
          Try Again!
        </button>
      </div>
    </div>
  );
};
