import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  destination: "",
  open: false,
};

export const searchQuerySlice = createSlice({
  name: "search-query",
  initialState,
  reducers: {
    set: (state, action) => {
      state.destination = action.payload;
    },
    toggle: (state) => {
      state.open = !state.open;
    },
  },
});

export const { set, toggle } = searchQuerySlice.actions;

export const searchQueryReducer = searchQuerySlice.reducer;
