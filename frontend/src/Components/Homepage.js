import { useEffect, useState } from "react";

import PostListItem from "./PostListItem";
import ErrorMessage from "./ErrorMessage";

function HomePage(props) {
  const [posts, setPosts] = useState(props.posts);
  const [currentUser, setCurrentUser] = useState(props.user);

  //componentOnMount
  useEffect(() => {
    console.log(props);
  }, []);

  return (
    <div
      className="d-flex flex-column align-items-stretch justify-content-center container"
      style={{ maxWidth: "900px" }}
    >
      <h3 className="text-center m-4">Home</h3>
      <div className="text-end">
        <a
          className={`btn ${
            currentUser ? "btn-primary" : "btn-secondary disabled"
          }`}
          href="/post/create"
          aria-disabled={currentUser === undefined}
        >
          Create Post
        </a>
      </div>

      <ul className="list-group mt-3 gap-3">
        {/* posts here */}
        {posts === undefined ? (
          <ErrorMessage path="Async Props" message={"Posts are undefined"} />
        ) : posts.length ? (
          posts.map((post) => {
            return <PostListItem post={post} user={currentUser} />;
          })
        ) : (
          <p>There are no posts yet.</p>
        )}
      </ul>
    </div>
  );
}

export default HomePage;
