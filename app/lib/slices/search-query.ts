import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  destination: "",
};

export const searchQuerySlice = createSlice({
  name: "search-query",
  initialState,
  reducers: {
    set: (state, action) => {
      state.destination = action.payload;
    },
  },
});

export const { set } = searchQuerySlice.actions;

export const searchQueryReducer = searchQuerySlice.reducer;
