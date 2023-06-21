import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "../src/Styles/custom.css";

import { Provider } from "react-redux";
import store from "./Context/store.js";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
