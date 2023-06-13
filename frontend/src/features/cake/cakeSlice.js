import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  numOfCakes: 10,
};

// create slice takes an object with name, initialState and reducers
const cakeSlice = createSlice({
  name: "cake",
  initialState,
  reducers: {
    //each action as a function which takes state and action
    //createSlice automatically creates action creators according to the names of each of the reducer's inputs
    //syntax: actionName: (state,action => {})
    //can directly mutate the state argument, because createSlice uses immer library
    ordered: (state) => {
      state.numOfCakes--;
    },
    restocked: (state, action) => {
      state.numOfCakes += parseInt(action.payload);
    },
  },
});

export default cakeSlice.reducer;
export const { ordered, restocked } = cakeSlice.actions;
