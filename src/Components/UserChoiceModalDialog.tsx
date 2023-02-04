import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
// MUI
import { Button } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Transition } from "../styles/muiStyles";
import { MainState } from "../redux/types";

// REDUX
import { modalActions } from "../redux/modalSlice";
import { durationActions } from "../redux/durationSlice";

// UTILS
import { formatSecondsToHHMMSS } from "../utils/getTimeStringFromSeconds";

export const UserChoiceModalDialog = ({ category }: { category: string[] }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const duration = useSelector((state: MainState) => state.duration);
  const difficulty = useSelector((state: MainState) => state.difficulty.value);
  const quiz = useSelector((state: MainState) => state.quiz);
  const modal = useSelector((state: MainState) => state.modal);

  const handleModalClose = (event: any, reason: any) => {
    if (reason !== "backdropClick" && reason !== "escapeKeyDown") {
      // Set 'open' to false, however you would do that with your particular code.
      dispatch(modalActions.closeModal());
      navigate("/quiz");
    }
  };

  return (
    <Dialog
      open={modal.isOpen}
      TransitionComponent={Transition}
      keepMounted
      onClose={handleModalClose}
      aria-describedby="alert-dialog-slide-description"
    >
      <DialogTitle sx={{ mt: 1, textAlign: "center" }}>
        {modal.message}
      </DialogTitle>
      <hr />
      <DialogContent sx={{ width: "100%", mx: "auto", textAlign: "center" }}>
        <DialogContentText id="alert-dialog-slide-description">
          <span className="text-[#160040]">
            <span className="flex justify-between py-3">
              <span className="mr-4">Categories</span>
              <span>
                {category.map((category, index) => (
                  <span
                    className="bg-gray-200 text-sm mb-2 px-4 py-1 rounded-full block capitalize"
                    key={index}
                  >
                    {category.replaceAll("_", " ").replaceAll("and", "&")}
                  </span>
                ))}
              </span>
            </span>
            <span className="flex justify-between py-3">
              <span>Difficulty</span>
              <span>{difficulty}</span>
            </span>
          </span>
          <span className="text-[#160040] block w-full px-3 py-3 border border-[#FF165D] rounded-lg">
            You got{" "}
            <span className="font-bold">
              {formatSecondsToHHMMSS(duration.timeLeft)}
            </span>{" "}
            for <span className="font-bold">{quiz.count}</span> questions. Good
            Luck!
          </span>
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button
          variant="contained"
          color="neutral"
          disabled={(quiz.fetch.isLoading && true) || false}
          sx={{ mx: "auto", mb: 2, color: "#FFFFFF" }}
          onClick={() => {
            dispatch(modalActions.closeModal());
            dispatch(
              durationActions.setTimer(
                setInterval(() => {
                  dispatch(durationActions.updateTimeLeft());
                }, 10)
              )
            );
            navigate("/quiz");
          }}
        >
          Go to Answer
        </Button>
      </DialogActions>
    </Dialog>
  );
};
