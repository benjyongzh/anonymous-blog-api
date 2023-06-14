import axios from "axios";
import store from "../Context/store.js";

export default axios.create({
  baseURL: `${process.env.REACT_APP_API_INDEX_URL}${process.env.REACT_APP_BACKEND_PORT}`,
  headers: {
    common:
      store.getState().auth.authToken === ""
        ? null
        : {
            //Authorization: localStorage.getItem("auth_token")
            //use redux store for this:

            Authorization: "Bearer " + store.getState().auth.authToken,
          },
    post: { "Content-Type": "application/json" },
  },
});
