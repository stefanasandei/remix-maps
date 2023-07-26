import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  lat: 47.1615416,
  lon: 27.5837224, // for debug
  //   lat: 0.0,
  //   lon: 0.0,
};

export const destinationSlice = createSlice({
  name: "destination",
  initialState,
  reducers: {
    set: (state, action) => {
      state.lat = action.payload.lat;
      state.lon = action.payload.lon;
    },
  },
});

export const { set } = destinationSlice.actions;

export const destinationReducer = destinationSlice.reducer;
