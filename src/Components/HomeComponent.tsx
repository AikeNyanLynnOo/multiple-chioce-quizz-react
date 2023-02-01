// REACT
import { useEffect, useState, forwardRef } from "react";

// MUI
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { ThemeProvider } from "@mui/material/styles";
import { theme } from "../styles/muiStyles";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import { TransitionProps } from "@mui/material/transitions";

// CUSTOM FUMCTIONS
import { fetchMetaData } from "../fetchers/fetchMetaData";
import { fetchQuestions } from "../fetchers/fetchQuestions";
import { selectboxBorder } from "../styles/muiStyles";
import {
  Button,
  Checkbox,
  Chip,
  ListItemText,
  OutlinedInput,
} from "@mui/material";
import { MenuProps } from "../styles/muiStyles";

// REDUX
import { useSelector, useDispatch } from "react-redux";
import { durationActions } from "../redux/durationSlice";
import { difficultyActions } from "../redux/difficultySlice";
import { quizActions } from "../redux/quizSlice";
import { modalActions } from "../redux/modalSlice";
import { MainState, QuizItem } from "../redux/types";
import { useNavigate } from "react-router-dom";

const Transition = forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export const Home = () => {
  // redux
  const dispatch = useDispatch();

  // navigate
  const navigate = useNavigate();

  const [categories, setCategories] = useState<Array<string>>([]);
  const [difficulties, setDifficulties] = useState<Array<string>>([]);

  const [isCategorySelected, setIsCategorySelected] = useState(true);
  const [category, setCategory] = useState<Array<string>>([]);
  const duration = useSelector((state: MainState) => state.duration);
  const difficulty = useSelector((state: MainState) => state.difficulty.value);
  const quiz = useSelector((state: MainState) => state.quiz);
  const modal = useSelector((state: MainState) => state.modal);

  useEffect(() => {
    if (category.length) {
      setIsCategorySelected((prev) => true);
      return;
    }
    setIsCategorySelected((prev) => false);
  }, [category]);

  useEffect(() => {
    // for first time, make error messages not to be shown
    // console.log("This is first time useEffect");
    setIsCategorySelected(true);

    fetchMetaData()
      .then((categories: any) => {
        setCategories([...Object.keys(categories["byCategory"])]);
        setDifficulties([
          ...Object.keys(categories["byDifficulty"]).filter(
            (difficulty) => difficulty !== "null"
          ),
        ]);
      })
      .catch((err) => {
        console.log("ERROR while fetching categories " + err);
      });
  }, []);

  const changeCategory = (event: SelectChangeEvent<typeof category>) => {
    const {
      target: { value },
    } = event;
    setCategory(typeof value === "string" ? value.split(",") : value);
  };

  const changeDifficulty = (event: SelectChangeEvent) => {
    dispatch(difficultyActions.setDifficulty(event.target.value as string));
  };

  const changeQuizCount = (event: SelectChangeEvent) => {
    dispatch(quizActions.setQuizCount(parseInt(event.target.value)));
  };

  const changeTimeUp = (event: SelectChangeEvent) => {
    dispatch(durationActions.setTimeUp(parseInt(event.target.value) * 60));
    setInterval(() => {
      dispatch(durationActions.updateTimeLeft());
    }, 1000);
  };

  const handleModalClose = (event: any, reason: any) => {
    if (reason !== "backdropClick" && reason !== "escapeKeyDown") {
      // Set 'open' to false, however you would do that with your particular code.
      dispatch(modalActions.closeModal());
      navigate("/quiz");
    }
  };

  const handleSubmit = async () => {
    if (!category.length) {
      setIsCategorySelected(false);
      return;
    }
    dispatch(modalActions.openModal("Loading"));
    fetchQuestions({
      categories: category.join(","),
      limit: quiz.count,
      difficulty,
    })
      .then((questions: QuizItem[]) => {
        dispatch(quizActions.setallQuizzes(questions));
        dispatch(modalActions.setMessage("Questions successfully generated!"));
        console.log("Questions obtained " + questions.length);
      })
      .catch((err) => {
        dispatch(modalActions.setMessage("Error While Generating Quizzes"));
      });
  };

  return (
    <ThemeProvider theme={theme}>
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
                      className="bg-gray-200 text-sm mb-2 px-4 py-1 rounded-full block"
                      key={index}
                    >
                      {category}
                    </span>
                  ))}
                </span>
              </span>
              <span className="flex justify-between py-3">
                <span>Difficulty</span>
                <span>{difficulty}</span>
              </span>
            </span>
            <span className="text-[#160040]">
              You got <span className="font-bold">{duration.timeLeft}</span> s
              for <span className="font-bold">{quiz.count}</span> questions.
              Good Luck!
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
              navigate("/quiz");
            }}
          >
            Go to Answer
          </Button>
        </DialogActions>
      </Dialog>

      {(categories.length > 0 && difficulties.length > 0 && (
        <div className="py-20 h-auto bg-[#495579]">
          <div className="text-center">
            <h1 className="text-[#FF165D] text-md font-semibold">Welcome</h1>
            <h2 className="text-3xl font-bold text-white">
              Time to test your Knowledge!
            </h2>
            <div className="text-white my-10 py-5 md:py-8 px-0 sm:px-5 md:px-20 rounded-lg border-0 sm:border border-[#FFFFFF] w-11/12 sm:w-9/12 lg:w-8/12 xl:w-5/12 2xl:w-4/12 mx-auto">
              <div className="my-5">
                <FormControl fullWidth>
                  <InputLabel
                    id="category-input-label"
                    sx={{ color: "#FFFFFF" }}
                  >
                    Category
                  </InputLabel>
                  <Select
                    sx={selectboxBorder}
                    labelId="category-input-label"
                    id="category-input"
                    multiple
                    value={[...category]}
                    onChange={changeCategory}
                    input={
                      <OutlinedInput
                        id="select-multiple-chip"
                        label="Category"
                      />
                    }
                    renderValue={(selected) => (
                      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                        {selected.map((value) => (
                          <Chip
                            key={value}
                            label={value}
                            sx={{
                              color: "#FF165D",
                              backgroundColor: "#DDDDDD",
                            }}
                          />
                        ))}
                      </Box>
                    )}
                    MenuProps={MenuProps}
                  >
                    {categories.map((cat, key) => (
                      <MenuItem key={key} value={cat}>
                        <Checkbox checked={category.indexOf(cat) > -1} />
                        <ListItemText primary={cat} />
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                {!isCategorySelected && (
                  <span className="text-[#FF165D] text-sm italic font-semibold">
                    Please select at lease one category
                  </span>
                )}
              </div>

              <div className="my-5">
                <FormControl fullWidth>
                  <InputLabel
                    id="difficulty-input-label"
                    sx={{ color: "#FFFFFF" }}
                  >
                    Difficulty
                  </InputLabel>
                  <Select
                    sx={selectboxBorder}
                    labelId="difficulty-input-label"
                    id="difficulty-input"
                    value={difficulty}
                    label="Difficulty"
                    onChange={changeDifficulty}
                    MenuProps={MenuProps}
                  >
                    {difficulties.map((difficulty, key) => (
                      <MenuItem key={key} value={difficulty}>
                        {difficulty}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </div>

              <div className="my-5">
                <FormControl fullWidth>
                  <InputLabel
                    id="question-count-input-label"
                    sx={{ color: "#FFFFFF" }}
                  >
                    How Many Quizes?
                  </InputLabel>
                  <Select
                    sx={selectboxBorder}
                    labelId="question-count-input-label"
                    id="question-count-input"
                    value={`${quiz.count}`}
                    label="How Many Quizes?"
                    onChange={changeQuizCount}
                    MenuProps={MenuProps}
                  >
                    {[5, 10, 15, 20].map((quizCount, key) => (
                      <MenuItem key={key} value={`${quizCount}`}>
                        {quizCount}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </div>
              <div className="my-5">
                <FormControl fullWidth>
                  <InputLabel
                    id="time-up-input-label"
                    sx={{ color: "#FFFFFF" }}
                  >
                    Time Up In?
                  </InputLabel>
                  <Select
                    sx={selectboxBorder}
                    labelId="time-up-input-label"
                    id="time-up-input"
                    value={`${duration.timeUp / 60} MINS`}
                    label="Time Up In?"
                    onChange={changeTimeUp}
                    MenuProps={MenuProps}
                  >
                    {["3 MINS", "5 MINS", "7 MINS", "10 MINS", "12 MINS"].map(
                      (duration, key) => (
                        <MenuItem key={key} value={duration}>
                          {duration}
                        </MenuItem>
                      )
                    )}
                  </Select>
                </FormControl>
              </div>
              <Button
                variant="contained"
                color="neutral"
                onClick={handleSubmit}
              >
                Start Quiz
              </Button>
            </div>
          </div>
        </div>
      )) || (
        <Dialog
          open={true}
          TransitionComponent={Transition}
          keepMounted
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogTitle sx={{ mt: 1, textAlign: "center" }}>
            Loading...
          </DialogTitle>
          <DialogContent sx={{ width: "70%", mx: "auto", textAlign: "center" }}>
            <DialogContentText id="alert-dialog-slide-description">
              Please wait while getting ready!
            </DialogContentText>
          </DialogContent>
        </Dialog>
      )}
    </ThemeProvider>
  );
};
