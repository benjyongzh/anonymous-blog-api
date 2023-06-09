import { useEffect, useState } from "react";

import PostListItem from "./PostListItem";
import ErrorMessage from "./ErrorMessage";

function HomePage(props) {
  const { allPosts, user: currentUser } = props;

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
        {allPosts === undefined ? (
          <ErrorMessage path="Async Props" message={"Posts are undefined"} /> //this is where to put the loading text
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

export default HomePage;
