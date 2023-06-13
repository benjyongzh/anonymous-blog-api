import { configureStore } from "@reduxjs/toolkit";

//middleware
// const reduxLogger = require("redux-logger");

//reducers
import userReducer from "../features/user/userSlice";

// const logger = reduxLogger.createLogger();

//configureStore takes an object as an arg
//this object
const store = configureStore({
  //the reducer key is similar to the combineReducer of the original redux
  reducer: {
    user: userReducer,
  },
  //middleware takes a function that has getDefaultMiddleware. concat your middleware to it
  //   middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});

export default store;
