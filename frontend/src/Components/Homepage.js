import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import axios from "../api/axios";
import { isEmpty } from "lodash";

import { useSelector } from "react-redux";

import PostListItem from "./PostListItem";
import LoadingMessage from "./LoadingMessage";

function Homepage(props) {
  const [allPosts, setAllPosts] = useState(undefined);
  const currentUser = useSelector((state) => state.auth.user);

  const getData = async () => {
    await axios
      .get(`/`)
      .then((response) => {
        console.log("Home page response: ", response);
        setAllPosts(response.data.posts || []);
      })
      .catch((error) => {});
  };

  //componentOnMount
  useEffect(() => {
    //do fetching
    getData();
  }, []);

  return (
    <div
      className="d-flex flex-column align-items-stretch justify-content-center container"
      style={{ maxWidth: "900px" }}
    >
      <h3 className="text-center m-4">Home</h3>
      <div className="text-end">
        <Link
          className={`btn ${
            currentUser ? "btn-primary" : "btn-secondary disabled"
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
