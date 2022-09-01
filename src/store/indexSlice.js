import { createSlice } from "@reduxjs/toolkit";

const indexSlice = createSlice({
  name: "index",
  initialState: { collegueIndex: "1", laptopIndex: "2" },
  reducers: {
    index(state, action) {
      state.index = action.payload;
    },
  },
});

export const { index } = indexSlice.actions;

export default indexSlice.reducer;
