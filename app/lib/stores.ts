import { configureStore } from "@reduxjs/toolkit";
import { searchQueryReducer } from "./slices/search-query";

export const store = configureStore({
  reducer: {
    searchQuery: searchQueryReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
