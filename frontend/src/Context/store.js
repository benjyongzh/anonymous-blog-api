import { configureStore } from "@reduxjs/toolkit";

//middleware
// import { createLogger } from "redux-logger";
// const logger = createLogger();

//redux-persist
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import thunk from "redux-thunk";
import { combineReducers } from "@reduxjs/toolkit";

const persistConfig = {
  key: "root",
  storage,
  blacklist: ["page"],
};

//reducers
import authReducer from "../Features/auth/authSlice";
import pageReducer from "../Features/page/pageSlice";
import displayReducer from "../Features/display/displaySlice";
const rootReducer = combineReducers({
  auth: authReducer,
  page: pageReducer,
  display: displayReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

//this object
const store = configureStore({
  //the reducer key is similar to the combineReducer of the original redux
  reducer: persistedReducer,
  //middleware takes a function that has getDefaultMiddleware. concat your middleware to it
  // middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
  middleware: [thunk],
});

export default store;
export const persistor = persistStore(store);
