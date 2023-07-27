import { configureStore } from "@reduxjs/toolkit";
import { searchQueryReducer } from "./slices/search-query";
import { destinationReducer } from "./slices/destination";
import { positionReducer } from "./slices/position";

export const store = configureStore({
  reducer: {
    searchQuery: searchQueryReducer,
    destination: destinationReducer,
    position: positionReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
