import axios from "axios";

export default axios.create({
  baseURL: `${process.env.REACT_APP_API_INDEX_URL}${process.env.REACT_APP_BACKEND_PORT}`,
  headers: {
    common: {
      //Authorization: localStorage.getItem("auth_token"), //use redux store for this
    },
    post: { "Content-Type": "application/json" },
  },
});
