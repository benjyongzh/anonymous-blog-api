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
        console.log("Posts: ", response.data.posts);
        console.log("UserToLookAt: ", response.data.userToLookAt);
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

  const accountName =
    !isEmpty(currentUser) && !isEmpty(userToLookAt) ? (
      userToLookAt._id.toString() === currentUser._id.toString() ? (
        <p className="text-center mb-1">(You)</p>
      ) : currentUser.member_status !== "Basic" ? (
        <p className="text-center mb-1">
          ({userToLookAt.first_name} {userToLookAt.last_name})
        </p>
      ) : (
        <p className="text-center mb-1">&nbsp;</p>
      )
    ) : (
      <p className="text-center mb-1">&nbsp;</p>
    );

  const memberStatus = !isEmpty(userToLookAt) ? (
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
  ) : null;

  const changingMemberStatus =
    !isEmpty(currentUser) &&
    !isEmpty(userToLookAt) &&
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
    !isEmpty(userToLookAt) &&
    userToLookAt._id.toString() === currentUser._id.toString() ? (
      <h6 className="text-center">Your posts</h6>
    ) : (
      <h6 className="text-center">Posts by {userToLookAt.username}</h6>
    );

  return (
    <div
      className="d-flex flex-column align-items-stretch justify-content-center container"
      style={{ maxWidth: "900px" }}
    >
      {isEmpty(userToLookAt) ? (
        <LoadingMessage path="Async userToLookAt" message={"user info..."} />
      ) : (
        <div>
          <h3 className="text-center mt-2 mb-0">{userToLookAt.username}</h3>
          {accountName}
          {memberStatus}
          {changingMemberStatus}
          <hr className="mt-0" />
          {postHeader}
        </div>
      )}
    </div>
  );
};

export default UserDetailpage;
