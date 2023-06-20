import { Link, useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axiosInstance from "../api/axios";
import { isEmpty } from "lodash";

import { useDispatch, useSelector } from "react-redux";
import { setPageName, setMainId } from "../Features/page/pageSlice";

import LoadingMessage from "../Components/LoadingMessage";
import UserDetailPostListItem from "../Components/UserDetailPostListItem";

const UserDetailpage = () => {
  const [posts, setPosts] = useState([]);
  const [userToLookAt, setUserToLookAt] = useState({});
  const [sameUser, setSameUser] = useState(false);
  const [loadingFlag, setLoadingFlag] = useState(false);
  const currentUser = useSelector((state) => state.auth.user);

  let { userId } = useParams();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const getData = async () => {
    await axiosInstance
      .get(`${location.pathname}`)
      .then((response) => {
        console.log("User Detail page response: ", response.data);
        setPosts(response.data.posts);
        setUserToLookAt(response.data.userToLookAt);
        setSameUser(response.data.sameUser);
        dispatch(setMainId(response.data.userToLookAt._id));
      })
      .catch((error) => {
        navigate("/users/null", { replace: true });
      });
  };
  //componentOnMount
  useEffect(() => {
    setLoadingFlag(true);
    dispatch(setPageName("user_detail"));
    //do fetching
    getData().then((response) => setLoadingFlag(false));
  }, [userId]);

  return (
    <div
      className="d-flex flex-column align-items-stretch justify-content-center container"
      style={{ maxWidth: "900px" }}
    >
      {isEmpty(userToLookAt) || loadingFlag ? (
        <LoadingMessage path="Async userToLookAt" message={"user info"} />
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
          <h5 className="text-center mb-3">
            {sameUser ? "Your posts" : `Posts by ${userToLookAt.username}`}
          </h5>

          <ul className="list-group mt-2 mb-3 gap-2">
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
              <p className="mt-3 text-center">
                There are no posts by {userToLookAt.username} yet.
              </p>
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

export default UserDetailpage;
