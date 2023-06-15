import { Navigate } from "react-router-dom";

function userNotFoundpage() {
  return (
    <Navigate
      to="/error"
      replace={true}
      state={{ message: "User could not be found" }}
    />
  );
}

export default userNotFoundpage;
