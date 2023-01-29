import { createTheme } from "@mui/material/styles";

export const selectboxBorder = {
  ".MuiOutlinedInput-notchedOutline": {
    borderColor: "rgba(43, 52, 103, 0.7)",
  },
  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
    borderColor: "rgba(255, 139, 19,0.9)",
  },
  "&:hover .MuiOutlinedInput-notchedOutline": {
    borderColor: "rgba(43, 52, 103, 1)",
  },
  textAlign: "left",
};

export const theme = createTheme({
  palette: {
    neutral: {
      main: "#FF8B13",
    },
  },
});

declare module "@mui/material/styles" {
  interface Palette {
    neutral: Palette["primary"];
  }

  // allow configuration using `createTheme`
  interface PaletteOptions {
    neutral?: PaletteOptions["primary"];
  }
}

// Update the Button's color prop options
declare module "@mui/material/Button" {
  interface ButtonPropsColorOverrides {
    neutral: true;
  }
}
