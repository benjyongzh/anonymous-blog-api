import { useEffect, useState } from "react";
import { useLocation, Outlet } from "react-router-dom";

import ErrorMessage from "./ErrorMessage";

function Authpage(props) {
  const { user: currentUser } = props;
  const location = useLocation();
  const [title, setTitle] = useState("");

  const authTitles = {
    login: "Log In",
    signup: "Sign Up",
    loggingout: "Logging Out",
    logout: "Logged Out",
  };

  useEffect(() => {
    const authPath = location.pathname.split("/")[2];
    setTitle(authTitles[authPath]);
  }, []);

  return (
    <div
      className="d-flex flex-column align-items-stretch justify-content-center container"
      style={{ maxWidth: "380px" }}
    >
      <h3 className="text-center m-4">{title}</h3>
      <Outlet />
    </div>
  );
}

export default Authpage;
