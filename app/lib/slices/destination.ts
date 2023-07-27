import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  //   lat: 47.1615416,
  //   lon: 27.5837224, // for debug
  lat: 0.0,
  lon: 0.0,
  duration: 0.0,
  distance: 0.0,
};

export const destinationSlice = createSlice({
  name: "destination",
  initialState,
  reducers: {
    set: (state, action) => {
      state.lat = action.payload.lat;
      state.lon = action.payload.lon;
    },
    addInfo: (state, action) => {
      state.duration = action.payload.duration;
      state.distance = action.payload.distance;
    },
  },
});

export const { set, addInfo } = destinationSlice.actions;

export const destinationReducer = destinationSlice.reducer;
