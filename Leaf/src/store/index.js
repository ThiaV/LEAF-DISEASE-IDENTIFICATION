import { configureStore } from "@reduxjs/toolkit";
import { speciesSlice } from "./speciesSlice";

export const store = configureStore({
  reducer: {
    species: speciesSlice.reducer,
  },
});
