import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axiosInstance from "../api/axios";
import { isEmpty } from "lodash";

import { useDispatch, useSelector } from "react-redux";
import { setPageName } from "../Features/page/pageSlice";

import LoadingMessage from "../Components/LoadingMessage";
import UserDetailPostListItem from "../Components/UserDetailPostListItem";

const UserDetailpage = () => {
  const [posts, setPosts] = useState([]);
  const [userToLookAt, setUserToLookAt] = useState({});
  const [sameUser, setSameUser] = useState(false);
  const currentUser = useSelector((state) => state.auth.user);
  // const pageName = useSelector((state) => state.page.pageName);

  const dispatch = useDispatch();

  const getData = async () => {
    await axiosInstance
      .get(`${location.pathname}`)
      .then((response) => {
        console.log("User Detail page response: ", response.data);
        // response.data will be:
        // {
        //   userToLookAt: {
        //     first_name: userToFind.first_name,
        //     last_name: userToFind.last_name,
        //     full_name: userToFind.full_name,
        //     username: userToFind.username,
        //     member_status: userToFind.member_status,
        //     url: userToFind.url,
        //   },
        //   sameUser: true/false,
        //   posts,
        // }
        // console.log("Posts: ", response.data.posts);
        // console.log("UserToLookAt: ", response.data.userToLookAt);
        setPosts(response.data.posts);
        setUserToLookAt(response.data.userToLookAt);
        setSameUser(response.data.sameUser);
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
          {/* accountName */}
          {sameUser ? (
            <p className="text-center mb-1">(You)</p>
          ) : !isEmpty(userToLookAt.full_name) ? (
            <p className="text-center mb-1">({userToLookAt.full_name})</p>
          ) : (
            <p className="text-center mb-1">&nbsp;</p>
          )}

          {/* memberStatus */}
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

          {/* changingMemberStatus */}
          {sameUser &&
          !isEmpty(currentUser) &&
          currentUser.member_status !== "Admin" ? (
            <div className="text-center mb-4">
              <Link
                className="btn btn-warning"
                to={`/users/${userToLookAt._id}/memberstatus`}
              >
                Upgrade Membership
              </Link>
            </div>
          ) : null}

          <hr className="mt-0" />

          {/* postHeader */}
          <h5 className="text-center">
            {sameUser ? "Your posts" : `Posts by ${userToLookAt.username}`}
          </h5>

          <ul className="list-group mt-2 mb-3">
            {posts.length ? (
              posts.map((post) => (
                <UserDetailPostListItem key={post._id} post={post} />
              ))
            ) : !isEmpty(currentUser) && sameUser ? (
              <p className="text-center">
                You have not made any posts yet.{" "}
                <Link className="link-primary" to="/posts/create">
                  Create one
                </Link>
                .
              </p>
            ) : (
              <p>There are no posts by {userToLookAt.username} yet.</p>
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

export default UserDetailpage;
