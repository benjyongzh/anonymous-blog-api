import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axiosInstance from "../api/axios";
import { isEmpty } from "lodash";

import { useDispatch, useSelector } from "react-redux";
import { setPageName } from "../Features/page/pageSlice";

import LoadingMessage from "./LoadingMessage";

const UserDetailpage = () => {
  const [posts, setPosts] = useState([]);
  const [userToLookAt, setUserToLookAt] = useState({});
  const currentUser = useSelector((state) => state.auth.user);
  const pageName = useSelector((state) => state.page.pageName);

  const dispatch = useDispatch();

  const getData = async () => {
    await axiosInstance
      .get(`${location.pathname}`)
      .then((response) => {
        console.log("User Detail page response: ", response.data);
        setPosts(response.data.posts);
        setUserToLookAt(response.data.userToLookAt);
      })
      .catch((error) => {
        console.log(error);
        setErrors([{ path: "generic", msg: "Connection to server failed" }]);
      });
  };
  //componentOnMount
  useEffect(() => {
    dispatch(setPageName("user_detail"));
    //do fetching
    getData();
  }, []);

  const accountName = () => {
    return userToLookAt._id.toString() === currentUser._id.toString() ? (
      <p className="text-center mb-1">(You)</p>
    ) : currentUser.member_status !== "Basic" ? (
      <p className="text-center mb-1">
        ({userToLookAt.first_name} {userToLookAt.last_name})
      </p>
    ) : (
      <p className="text-center mb-1">&nbsp;</p>
    );
  };

  const memberStatus = (
    <div className="d-flex justify-content-center">
      <p
        className={`badge text-center ${
          userToLookAt.member_status === "Basic"
            ? "text-bg-primary"
            : userToLookAt.member_status === "Premium"
            ? "text-bg-warning"
            : "text-bg-danger"
        }`}
      >
        {userToLookAt.member_status}
      </p>
    </div>
  );

  const changingMemberStatus =
    !isEmpty(currentUser) &&
    userToLookAt._id.toString() === currentUser._id.toString() &&
    currentUser.member_status !== "Admin" ? (
      <div className="text-center mb-4">
        <Link
          className="btn btn-warning"
          to={`/users/${userToLookAt._id}/memberstatus`}
        >
          Upgrade Membership
        </Link>
      </div>
    ) : null;

  const postHeader =
    !isEmpty(currentUser) &&
    userToLookAt._id.toString() === currentUser._id.toString() ? (
      <h6 className="text-center">Your posts</h6>
    ) : (
      <h6 className="text-center">Posts by {userToLookAt.username}</h6>
    );

  return !isEmpty(userToLookAt) ? (
    <div
      className="d-flex flex-column align-items-stretch justify-content-center container"
      style={{ maxWidth: "900px" }}
    >
      <LoadingMessage path="Async userToLookAt" message={"user info..."} />
    </div>
  ) : (
    <div
      className="d-flex flex-column align-items-stretch justify-content-center container"
      style={{ maxWidth: "900px" }}
    >
      <h3 className="text-center mt-2 mb-0">{userToLookAt.username}</h3>
      {!isEmpty(currentUser) ? (
        { accountName }
      ) : (
        <p className="text-center mb-1">&nbsp;</p>
      )}
      {memberStatus}
      {changingMemberStatus}
      <hr className="mt-0" />
      {postHeader}
    </div>
  );
};

export default UserDetailpage;
