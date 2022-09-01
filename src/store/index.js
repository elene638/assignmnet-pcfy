import { configureStore } from "@reduxjs/toolkit";
import indexSLiceReducer from "./indexSlice";

const store = configureStore({
  reducer: {
    index: indexSLiceReducer,
  },
});

export default store;
