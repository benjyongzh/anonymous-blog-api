import { Link } from "react-router-dom";
import "../Styles/custom.css";

import { useSelector } from "react-redux";

function UserDetailPostListItem(props) {
  const { post: currentPost } = props;
  const displayMode = useSelector((state) => state.display.mode);

  return (
    <Link
      to={currentPost.url}
      className={`list-group-item list-group-item-action border border-0 rounded-0 ${
        displayMode === "light"
          ? "list-item-button-light"
          : "list-item-button-dark"
      }`}
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
