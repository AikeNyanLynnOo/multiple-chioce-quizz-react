import { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { MainState } from "../redux/types";
import { Snackbar, Button } from "@mui/material";
import AppsIcon from "@mui/icons-material/Apps";
import CloseIcon from "@mui/icons-material/Close";
import { motion } from "framer-motion";
import { gridDrawerVariants } from "../styles/framerStyles";

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
  const quiz = useSelector((state: MainState) => state.quiz);
  const duration = useSelector((state: MainState) => state.duration);
  const [drawerOpen, setDrawerOpen] = useState<null | boolean>(null);

  return (
    <div className="bg-[#160040] h-screen text-[#FF165D] text-center">
      {/* snack bar */}

      <div className="hidden sm:block">
        {/* <Snackbar
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
          open={duration.timeLeft <= 0 ? true : false}
          onClose={() => {}}
          message="Time Up!"
          action={SnackbarAction}
        /> */}
      </div>
      <div className="block sm:hidden">
        <Snackbar
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
          open={duration.timeLeft <= 0 ? true : false}
          onClose={() => {}}
          message="Time Up!"
          action={SnackbarAction}
        />
      </div>

      <div
        className="h-2 bg-[#FF165D] transition-all duration-150 ease-out"
        style={{ width: `${(duration.timeLeft / duration.timeUp) * 100}%` }}
      ></div>
      <span className="hidden sm:block absolute top-2 right-0 border border-[#FF165D] rounded-md py-3 px-2">
        Time Left - {formatSecondsToHHMMSS(duration.timeLeft)}
      </span>
      <AppsIcon
        className="absolute top-2 left-0 cursor-pointer z-10"
        onClick={() => setDrawerOpen(drawerOpen === null ? true : !drawerOpen)}
      />

      <motion.div
        variants={gridDrawerVariants}
        initial={drawerOpen === null ? "close" : drawerOpen ? "close" : "open"}
        animate={drawerOpen === null ? "" : drawerOpen ? "open" : "close"}
        className="border relative z-10 bg-[#160040] border-[#FF165D] rounded-md pt-4  pb-2 px-3 md:px-5 mx-auto sm:mr-auto sm:ml-0 w-11/12 sm:w-5/12 lg:w-4/12 xl:w-3/12 2xl:w-52"
      >
        <CloseIcon className="absolute top-2 right-2" />
        <div className="block sm:hidden border border-[#FF165D] rounded-md py-3 px-2">
          Time Left - {formatSecondsToHHMMSS(duration.timeLeft)}
        </div>
        <motion.div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 mt-3">
          {quiz.allQuizzes.map((quiz, index) => (
            <motion.span
              key={index}
              className="cursor-pointer text-center text-lg text-[#FF165D] py-2 px-0 sm:px-3 bg-[#ffffff] rounded-lg"
            >
              {index + 1}
            </motion.span>
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
};
