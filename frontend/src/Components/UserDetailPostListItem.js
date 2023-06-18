import { Link } from "react-router-dom";

function UserDetailPostListItem(props) {
  const { post: currentPost } = props;

  return (
    <Link
      to={currentPost.url}
      className="list-group-item list-group-item-action"
    >
      <p>
        {currentPost.date_of_post_formatted} ({currentPost.date_of_post_ago})
      </p>
      <p className="h5">{currentPost.title}</p>
      {currentPost.comments.length === 1 ? (
        <p className="mb-0">{currentPost.comments.length} Comment</p>
      ) : (
        <p className="mb-0">{currentPost.comments.length} Comments</p>
      )}
    </Link>
  );
}

export default UserDetailPostListItem;
