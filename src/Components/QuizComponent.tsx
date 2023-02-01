import { useSelector, useDispatch } from "react-redux";
import { MainState } from "../redux/types";
import { Snackbar, Button } from "@mui/material";

const SnackbarAction = (
  <Button color="secondary" size="small">
    See Results
  </Button>
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

  return (
    <div className="bg-[#160040] h-screen text-[#FF165D] text-center">
      {/* snack bar */}

      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={duration.timeLeft <= 0 ? true : false}
        onClose={() => {}}
        message="I love snacks"
        action={SnackbarAction}
      />

      <div
        className="h-2 bg-[#FF165D] transition-all duration-150 ease-out"
        style={{ width: `${(duration.timeLeft / duration.timeUp) * 100}%` }}
      ></div>
      <span className="absolute top-2 right-0 border border-[#FF165D] rounded-md py-3 px-2">
        Time Left - {formatSecondsToHHMMSS(duration.timeLeft)}
      </span>
      <div className="grid grid-cols-4 gap-3 lg border border-[#FF165D] rounded-md py-5 px-5 mx-auto sm:mx-0 sm:mr-auto w-11/12 sm:w-5/12 lg:w-4/12 xl:w-3/12 2xl:w-52">
        {quiz.allQuizzes.map((quiz, index) => (
          <span
            key={index}
            className="cursor-pointer text-lg text-[#FF165D] py-2 px-3 bg-[#ffffff] m-2 rounded-lg"
          >
            {index + 1}
          </span>
        ))}
      </div>
    </div>
  );
};
