import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import axiosInstance from "../api/axios";
import { isEmpty } from "lodash";

import { useDispatch, useSelector } from "react-redux";
import {
  setPageName,
  pageNameList,
  setMainId,
} from "../Features/page/pageSlice";

import PostListItem from "../Components/PostListItem";
import LoadingMessage from "../Components/LoadingMessage";

function Homepage(props) {
  const [allPosts, setAllPosts] = useState([]);
  const [loadingFlag, setLoadingFlag] = useState(false);
  const currentUser = useSelector((state) => state.auth.user);
  const pageName = useSelector((state) => state.page.pageName);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const getData = async () => {
    await axiosInstance
      .get(`/`)
      .then((response) => {
        // console.log("Home page response: ", response);
        setAllPosts(response.data.posts || []);
      })
      .catch((error) => {
        navigate("/error", {
          state: { message: "Connection to server not found" },
          replace: true,
        });
      });
  };

  //componentOnMount
  useEffect(() => {
    setLoadingFlag(true);
    //do fetching
    dispatch(setPageName("home"));
    dispatch(setMainId(""));
    getData().then((response) => setLoadingFlag(false));
  }, []);

  return (
    <div
      className="d-flex flex-column align-items-stretch justify-content-center container"
      style={{ maxWidth: "900px" }}
    >
      <h3 className="text-center m-4">{pageNameList[pageName]}</h3>
      <div className="text-end">
        <Link
          className={`btn ${
            !isEmpty(currentUser) ? "btn-primary" : "btn-secondary disabled"
          }`}
          to="/posts/create"
          aria-disabled={isEmpty(currentUser)}
        >
          Create Post
        </Link>
      </div>

      <ul className="list-group mt-3 gap-3">
        {/* posts here */}
        {loadingFlag ? (
          <LoadingMessage path="Async Props" message={"posts"} />
        ) : allPosts.length ? (
          allPosts.map((post) => {
            return (
              <PostListItem
                post={post}
                currentUser={currentUser}
                key={post._id}
              />
            );
          })
        ) : (
          <p>There are no posts yet.</p>
        )}
      </ul>
    </div>
  );
}

export default Homepage;
