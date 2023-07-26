import { configureStore } from "@reduxjs/toolkit";
import { searchQueryReducer } from "./slices/search-query";
import { destinationReducer } from "./slices/destination";

export const store = configureStore({
  reducer: {
    searchQuery: searchQueryReducer,
    destination: destinationReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
