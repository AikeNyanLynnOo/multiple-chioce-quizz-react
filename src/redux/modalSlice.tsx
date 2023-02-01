import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ModalState } from "./types";

const initialState = {
  isOpen: false,
  message: "",
};

export const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    openModal: (state: ModalState, action: PayloadAction<string>) => {
      state.isOpen = true;
      state.message = action.payload;
    },
    closeModal: (state: ModalState, action: PayloadAction<void>) => {
      state.isOpen = false;
      state.message = "";
    },
    setMessage: (state: ModalState, action: PayloadAction<string>) => {
      state.message = action.payload;
    },
  },
});

export const modalActions = modalSlice.actions;
