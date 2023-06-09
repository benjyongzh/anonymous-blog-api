import { Link } from "react-router-dom";

function PostListItem(props) {
  const { post: currentPost, currentUser } = props;

  return (
    <Link
      to={currentPost.url} //need to solve how to get virtuals from mongoose object
      className="list-group-item list-group-item-action bg-light bg-gradient border border-2 border-secondary rounded-3"
    >
      <div className="mb-1">
        {currentPost.user !== null ? (
          <span className="fw-bold text-primary">
            {currentPost.user.username}
            {currentUser && currentUser.member_status !== "Basic" ? (
              <span> ({currentPost.user.full_name})</span>
            ) : (
              ""
            )}
          </span>
        ) : (
          <span className="fw-bold text-secondary">Deleted User</span>
        )}
        <span> - {currentPost.date_of_post_ago}</span>
      </div>
      <p className="h5">{currentPost.title}</p>
      {currentPost.comments.length === 1 ? (
        <p className="mb-0">{currentPost.comments.length} Comment</p>
      ) : (
        <p className="mb-0">{currentPost.comments.length} Comments</p>
      )}
    </Link>
  );
}

export default PostListItem;
