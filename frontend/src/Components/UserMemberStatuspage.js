import { Navigate } from "react-router-dom";

function UserMemberStatuspage() {
  return (
    <Navigate
      to="/error"
      replace={true}
      state={{ message: "User member status page" }}
    />
  );
}

export default UserMemberStatuspage;
