import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  lat: 0.0,
  lon: 0.0,
};

export const positionSlice = createSlice({
  name: "position",
  initialState,
  reducers: {
    set: (state, action) => {
      state.lat = action.payload.lat;
      state.lon = action.payload.lon;
    },
  },
});

export const { set } = positionSlice.actions;

export const positionReducer = positionSlice.reducer;
