import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import axiosInstance from "../api/axios";
import { isEmpty } from "lodash";

import { useDispatch, useSelector } from "react-redux";
import { setPageName, pageNameList } from "../Features/page/pageSlice";

import PostListItem from "../Components/PostListItem";
import LoadingMessage from "../Components/LoadingMessage";

function Homepage(props) {
  const [allPosts, setAllPosts] = useState(undefined);
  const currentUser = useSelector((state) => state.auth.user);
  const pageName = useSelector((state) => state.page.pageName);

  const dispatch = useDispatch();

  const getData = async () => {
    await axiosInstance
      .get(`/`)
      .then((response) => {
        // console.log("Home page response: ", response);
        setAllPosts(response.data.posts || []);
      })
      .catch((error) => console.log("Home page error caught: ", error));
  };

  //componentOnMount
  useEffect(() => {
    //do fetching
    dispatch(setPageName("home"));
    getData();
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
        {allPosts === undefined ? (
          <LoadingMessage path="Async Props" message={"blog posts"} />
        ) : allPosts.length > 0 ? (
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
