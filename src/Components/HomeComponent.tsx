// REACT
import { useEffect, useState } from "react";

// MUI
// import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { fetchMetaData } from "../fetchers/fetchMetaData";

export const Home = () => {
  const [categories, setCategories] = useState<Array<string>>([]);
  const [difficulties, setDifficulties] = useState<Array<string>>([]);
  const [category, setCategory] = useState("");
  const [difficulty, setDifficulty] = useState("");
  // const [time, setTime] = useState("");

  const changeCategory = (event: SelectChangeEvent) => {
    setCategory(event.target.value as string);
  };
  const changeDifficulty = (event: SelectChangeEvent) => {
    setDifficulty(event.target.value as string);
  };
  // const changeTime = (event: SelectChangeEvent) => {
  //   setTime(event.target.value as string);
  // };

  useEffect(() => {
    fetchMetaData()
      .then((categories: any) => {
        setCategories([...Object.keys(categories["byCategory"])]);
        setDifficulties([...Object.keys(categories["byDifficulty"])]);
      })
      .catch((err) => {
        console.log("ERROR while fetching categories " + err);
      });
  }, []);

  return (
    <div className="py-20 h-auto">
      <div className="text-center">
        <h1 className="text-[#FF8B13] text-md font-semibold">Welcome</h1>
        <h2 className="text-3xl  font-bold">Time to test your Knowledge!</h2>
        <div className="my-10 py-10 px-16 rounded-lg border border-[#243763] w-11/12 sm:w-9/12 lg:w-8/12 xl:w-5/12 2xl:w-4/12 mx-auto">
          <FormControl fullWidth>
            <InputLabel id="category-input-label">Category</InputLabel>
            <Select
              labelId="category-input-label"
              id="category-input"
              value={category}
              label="Category"
              onChange={changeCategory}
            >
              {categories.map((category, key) => (
                <MenuItem key={key} value={key}>
                  {category}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl fullWidth>
            <InputLabel id="difficulty-input-label">Difficulty</InputLabel>
            <Select
              labelId="difficulty-input-label"
              id="difficulty-input"
              value={difficulty}
              label="Difficulty"
              onChange={changeDifficulty}
            >
              {difficulties.map((difficulty, key) => (
                <MenuItem key={key} value={key}>
                  {difficulty}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
      </div>
    </div>
  );
};
