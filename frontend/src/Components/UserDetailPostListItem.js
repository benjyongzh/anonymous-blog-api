import { Link } from "react-router-dom";

function UserDetailPostListItem(props) {
  const { post: currentPost } = props;

  return (
    <Link
      to={currentPost.url}
      className="list-group-item list-group-item-action bg-secondary-subtle  border border-1 border-secondary-subtle rounded-3"
    >
      <p className="fst-italic text-secondary">
        {currentPost.date_of_post_formatted} ({currentPost.date_of_post_ago})
      </p>
      <h5>{currentPost.title}</h5>
      {currentPost.comments.length === 1 ? (
        <p className="mb-0">{currentPost.comments.length} Comment</p>
      ) : (
        <p className="mb-0">{currentPost.comments.length} Comments</p>
      )}
    </Link>
  );
}

export default UserDetailPostListItem;
