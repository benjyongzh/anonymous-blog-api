import { useLocation, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "../api/axios";

import { useDispatch, useSelector } from "react-redux";
import { loggedIn, loggedOut } from "../Features/auth/authSlice";

function LoggingOutPage(props) {
  const [logoutSuccess, setLogoutSuccess] = useState(false);
  const location = useLocation();
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.auth.user);

  const getData = async () => {
    await axios
      .get(`${location.pathname}`)
      .then((response) => {
        console.log("logging out response: ", response);
        //response from auth.js backend:
        // {
        //   message: `Logging out ${user.username}`,
        //   user,
        //   removedToken: bearerToken,
        // }
        console.log(response.data.message);
        // const username = response.data.user;
        dispatch(loggedOut());

        setLogoutSuccess(true);
      })
      .catch((error) => {});
  };

  //componentOnMount
  useEffect(() => {
    //do fetching
    console.log("currentUser before logging out: ", currentUser);
    getData();
  }, []);

  return logoutSuccess ? (
    <Navigate to="/auth/logout" replace={true} />
  ) : (
    <div>
      <p className="text-center">`Logging you out...`</p>
    </div>
  );
}

export default LoggingOutPage;
