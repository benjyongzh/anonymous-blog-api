import { useLocation, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axiosInstance from "../api/axios";

import { useDispatch, useSelector } from "react-redux";
import { loggedOut } from "../Features/auth/authSlice";
import { setPageName, setMainId } from "../Features/page/pageSlice";

function LoggingOutPage(props) {
  const [logoutSuccess, setLogoutSuccess] = useState(false);
  const [username, setUsername] = useState("");
  const location = useLocation();
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.auth.user);

  const getData = async () => {
    await axiosInstance
      .post(`${location.pathname}`)
      .then((response) => {
        // console.log("logging out response: ", response);
        // console.log(response.data.message);
        setUsername(currentUser.username);
        dispatch(loggedOut());
        setLogoutSuccess(true);
      })
      .catch((error) => {
        // console.log("Logging out page error caught: ", error);
        // console.log("Request header: ", error.request.header);
      });
  };

  const identicalUserId = () => {
    const pathStringId = location.pathname.split("/")[3];
    const storeId = currentUser._id;
    return pathStringId === storeId;
  };

  //componentOnMount
  useEffect(() => {
    dispatch(setPageName("loggingout"));
    dispatch(setMainId(currentUser._id));
    //do fetching
    if (identicalUserId()) {
      getData();
    } /* else
      console.log(
        "LoggingOutPage detects different userIDs between URL and storeData"
      ); */
  }, []);

  return logoutSuccess ? (
    <Navigate to="/auth/logout" replace={true} state={{ username: username }} />
  ) : (
    <div>
      <p className="text-center">Logging you out...</p>
    </div>
  );
}

export default LoggingOutPage;
