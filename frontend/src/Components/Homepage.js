import { useEffect, useState } from "react";

import PostListItem from "./PostListItem";

function HomePage({ props }) {
  const [posts, setPosts] = useState(props.posts);

  return (
    <div
      className="d-flex flex-column align-items-stretch justify-content-center container"
      style={{ maxWidth: "900px" }}
    >
      <h3 className="text-center m-4">Home</h3>
      <div className="text-end">
        <a
          className={`btn ${
            props.user ? "btn-primary" : "btn-secondary disabled"
          }`}
          href="/post/create"
          aria-disabled={props.user === undefined}
        >
          Create Post
        </a>
      </div>

      <ul className="list-group mt-3 gap-3">
        {/* posts here */}
        {posts.length ? (
          posts.map((post) => {
            return <PostListItem post={post} user={props.user} />;
          })
        ) : (
          <p>There are no posts yet.</p>
        )}
      </ul>
    </div>
  );
}

export default HomePage;
