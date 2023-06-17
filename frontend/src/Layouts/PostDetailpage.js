import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axiosInstance from "../api/axios";
import { isEmpty } from "lodash";

import { useDispatch, useSelector } from "react-redux";
import { setPageName } from "../Features/page/pageSlice";

import LoadingMessage from "../Components/LoadingMessage";

const PostDetailpage = () => {
  const [currentPost, setCurrentPost] = useState({});
  const currentUser = useSelector((state) => state.auth.user);
  const pageName = useSelector((state) => state.page.pageName);

  const dispatch = useDispatch();

  const getData = async () => {
    await axiosInstance
      .get(`${location.pathname}`)
      .then((response) => {
        console.log("Post Detail page response: ", response.data);
        setCurrentPost(response.data.post);
      })
      .catch((error) => {
        console.log(error);
        setErrors([{ path: "generic", msg: "Connection to server failed" }]);
      });
  };
  //componentOnMount
  useEffect(() => {
    dispatch(setPageName("post_detail"));
    //do fetching
    getData();
  }, []);

  /* const accountName =
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
    ); */

  /* const memberStatus = !isEmpty(userToLookAt) ? (
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
  ) : null; */

  /* const changingMemberStatus =
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
    ) : null; */

  const postHeader =
    !isEmpty(currentPost) &&
    userToLookAt._id.toString() === currentUser._id.toString() ? (
      <h5 className="text-center">Your posts</h5>
    ) : (
      <h6 className="text-center">Posts by {userToLookAt.username}</h6>
    );

  return (
    <div
      className="d-flex flex-column align-items-stretch justify-content-center container"
      style={{ maxWidth: "900px" }}
    >
      {isEmpty(currentPost) ? (
        <LoadingMessage path="Async post" message={"post info..."} />
      ) : (
        <div>
          {/* header */}
          <div className="d-flex flex-wrap mt-2 mb-0">
            {/* post OP and date of posting */}
            {currentPost.user !== null ? (
              <div>
                <Link
                  className="fw-bold link-primary"
                  to={currentPost.user.url}
                >
                  {currentPost.user.username}
                </Link>
                {!isEmpty(currentUser) &&
                currentUser.member_status !== "Basic" ? (
                  <span> ({currentPost.user.full_name})</span>
                ) : null}
              </div>
            ) : (
              <Link className="fw-bold link-secondary" to="/users/null">
                Deleted User
              </Link>
            )}
            <span>&nbsp;-&nbsp;</span>
            <p className="mb-0">
              posted on {currentPost.date_of_post_formatted}{" "}
              <em>({currentPost.date_of_post_ago})</em>
            </p>
            {/* delete button for admins */}
            {!isEmpty(currentUser) && currentUser.member_status === "Admin" ? (
              <form
                className="ms-auto"
                method="POST"
                action={`${location.pathname}/delete`}
              >
                <button
                  className="btn btn-outline-danger btn-sm text-center align-top"
                  style={{ borderWidth: "0px", maxWidth: "250px" }}
                  type="submit"
                >
                  <i className="bx bxs-trash align-bottom mb-1"></i>
                </button>
              </form>
            ) : null}
          </div>
        </div>
      )}
    </div>
  );
};

export default PostDetailpage;
