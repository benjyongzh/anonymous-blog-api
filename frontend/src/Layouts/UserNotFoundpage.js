import { Navigate } from "react-router-dom";

function UserNotFoundpage() {
  return (
    <Navigate
      to="/error"
      replace={true}
      state={{ message: "User could not be found" }}
    />
  );
}

export default UserNotFoundpage;
