/* import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  loading: false,
  authToken: "",
  user: {},
  error: "",
};

//createAsyncThunk takes 2 args. first is the action name. 2nd is the callback function to create the payload
//createAsyncThunk automatically creates promises: pending, fulfilled or rejected action types
export const fetchData = createAsyncThunk("auth/fetchData", (location) => {
  return axios
    .get(
      `${process.env.REACT_APP_API_INDEX_URL}${process.env.REACT_APP_BACKEND_PORT}${location}`
    )
    .then((response) => response.data); //establishing the payload of this action
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  //need extraReducers to listen to action types created by createAsyncThunk
  extraReducers: (builder) => {
    builder.addCase(fetchData.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(fetchData.fulfilled, (state, action) => {
      state.loading = false;
      state.authToken = action.payload.auth_token;
      state.user = action.payload.user;
      state.error = "";
    });
    builder.addCase(fetchData.rejected, (state, action) => {
      state.loading = false;
      state.authToken = "";
      state.user = {};
      state.error = action.error.message;
    });
  },
});

export default authSlice.reducer;
 */

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  authToken: "",
  user: {},
};

// create slice takes an object with name, initialState and reducers
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    //each action as a function which takes state and action
    //createSlice automatically creates action creators according to the names of each of the reducer's inputs
    //syntax: actionName: (state,action => {})
    //can directly mutate the state argument, because createSlice uses immer library
    loggedIn: (state, action) => {
      state.authToken = action.payload.auth_token;
      state.user = action.payload.user;
    },
    loggedOut: (state, action) => {
      state.authToken = "";
      state.user = {};
    },
  },
});

export default authSlice.reducer;
export const { loggedIn, loggedOut } = authSlice.actions;
