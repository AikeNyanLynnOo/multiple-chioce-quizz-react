import { forwardRef } from "react";
import { TransitionProps } from "@mui/material/transitions";
import { Slide } from "@mui/material";
import { createTheme } from "@mui/material/styles";

export const selectboxBorder = {
  color: "#FFFFFF",
  ".MuiOutlinedInput-notchedOutline": {
    borderColor: "#FFFFFF",
  },
  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
    borderColor: "#FF165D",
  },
  "&:hover .MuiOutlinedInput-notchedOutline": {
    borderColor: "#EEEEEE",
  },
  textAlign: "left",
};

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
export const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

export const theme = createTheme({
  palette: {
    neutral: {
      main: "#FF165D",
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

export const Transition = forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});
