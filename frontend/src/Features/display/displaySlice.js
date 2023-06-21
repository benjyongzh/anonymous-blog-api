import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  mode: "light", //light or dark
};

// create slice takes an object with name, initialState and reducers
const displaySlice = createSlice({
  name: "display",
  initialState,
  reducers: {
    setDisplayMode: (state, action) => {
      state.mode = action.payload;
    },
  },
});

export default displaySlice.reducer;
export const { setDisplayMode } = displaySlice.actions;
