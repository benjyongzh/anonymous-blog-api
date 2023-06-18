import { createSlice } from "@reduxjs/toolkit";

export const pageNameList = {
  user_detail: "User",
  login: "Log In",
  signup: "Sign Up",
  loggingout: "Logging Out",
  loggedout: "Logged Out",
  home: "Home",
  member_status: "Membership",
  error: "Oops!",
  post_create: "Create a Post",
};

const initialState = {
  pageName: "home", // user_detail, login, signup, loggingout, loggedout, home, member_status, error
  mainTitle: "Anon Blog",
};

// create slice takes an object with name, initialState and reducers
const pageSlice = createSlice({
  name: "page",
  initialState,
  reducers: {
    setPageName: (state, action) => {
      state.pageName = action.payload;
    },
    setMainTitle: (state, action) => {
      state.mainTitle = action.payload;
    },
  },
});

export default pageSlice.reducer;
export const { setPageName, setMainTitle } = pageSlice.actions;
