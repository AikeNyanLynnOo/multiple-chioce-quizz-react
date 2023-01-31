// REACT
import { useEffect, useState } from "react";

// MUI
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { ThemeProvider } from "@mui/material/styles";
import { theme } from "../styles/muiStyles";
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
import { MainState, QuizItem } from "../redux/types";
import { useNavigate } from "react-router-dom";

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

  useEffect(() => {
    console.log("This is dependency useEffect");
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
        setDifficulties([...Object.keys(categories["byDifficulty"])]);
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

  const handleSubmit = async () => {
    if (!category.length) {
      setIsCategorySelected(false);
      return;
    }
    const questions: QuizItem[] = await fetchQuestions({
      categories: category.join(","),
      limit: quiz.count,
      difficulty,
    });
    dispatch(quizActions.setallQuizzes(questions));
    console.log("Questions obtained " + questions.length);
    navigate("/quiz");
  };

  return (
    <ThemeProvider theme={theme}>
      {categories.length && difficulties.length && (
        <div className="py-20 h-auto">
          <div className="text-center">
            <h1 className="text-[#FF8B13] text-md font-semibold">Welcome</h1>
            <h2 className="text-3xl  font-bold">
              Time to test your Knowledge!
            </h2>
            <div className="my-10 py-5 md:py-8 px-0 sm:px-5 md:px-20 rounded-lg border-0 sm:border border-[#243763] w-11/12 sm:w-9/12 lg:w-8/12 xl:w-5/12 2xl:w-4/12 mx-auto">
              <div className="my-5">
                <FormControl fullWidth>
                  <InputLabel id="category-input-label">Category</InputLabel>
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
                          <Chip key={value} label={value} />
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
                  <span className="text-red-500 text-sm font-italic">
                    Please select at lease one category
                  </span>
                )}
              </div>

              <div className="my-5">
                <FormControl fullWidth>
                  <InputLabel id="difficulty-input-label">
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
                  <InputLabel id="question-count-input-label">
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
                  <InputLabel id="time-up-input-label">Time Up In?</InputLabel>
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
      )}
    </ThemeProvider>
  );
};
