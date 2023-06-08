import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

function PostListItem({ props }) {
  const [post, setPost] = useState(props.post);

  return (
    <a
      href={post.url}
      className="list-group-item list-group-item-action bg-light bg-gradient border border-2 border-secondary rounded-3"
    >
      <div className="mb-1">
        {post.user !== null ? (
          <span className="fw-bold text-primary">
            {post.user.username}
            {props.user && props.user.member_status !== "Basic" ? (
              <span> ({post.user.full_name})</span>
            ) : (
              ""
            )}
          </span>
        ) : (
          <span className="fw-bold text-secondary">Deleted User</span>
        )}
        <span> - {post.date_of_post_ago}</span>
      </div>
      <p className="h5">{post.title}</p>
      {post.comments.length === 1 ? (
        <p className="mb-0">{post.comments.length} Comment</p>
      ) : (
        <p className="mb-0">{post.comments.length} Comments</p>
      )}
    </a>
  );
}

export default PostListItem;
