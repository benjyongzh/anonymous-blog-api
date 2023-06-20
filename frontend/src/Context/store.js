import { configureStore } from "@reduxjs/toolkit";

//middleware
import { createLogger } from "redux-logger";
const logger = createLogger();

//reducers
import authReducer from "../Features/auth/authSlice";
import pageReducer from "../Features/page/pageSlice";
import displayReducer from "../Features/display/displaySlice";

//configureStore takes an object as an arg
//this object
const store = configureStore({
  //the reducer key is similar to the combineReducer of the original redux
  reducer: {
    auth: authReducer,
    page: pageReducer,
    display: displayReducer,
  },
  //middleware takes a function that has getDefaultMiddleware. concat your middleware to it
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});

export default store;
