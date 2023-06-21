import { Link } from "react-router-dom";
import { isEmpty } from "lodash";
import "../Styles/custom.css";

import { useSelector } from "react-redux";

function PostListItem(props) {
  const { post: currentPost, currentUser } = props;
  const displayMode = useSelector((state) => state.display.mode);

  return (
    <Link
      to={currentPost.url} //need to solve how to get virtuals from mongoose object
      className={`list-group-item list-group-item-action border border-0 rounded-0 ${
        displayMode === "light"
          ? "list-item-button-light"
          : "list-item-button-dark"
      }`}
    >
      <div className="d-flex justify-content-between mb-1 align-items-sm-top">
        {currentPost.user !== null ? (
          <div className="d-flex flex-column flex-sm-row justify-content-start align-items-sm-center">
            <div className="fw-bold text-primary">
              {currentPost.user.username}&nbsp;
            </div>
            {!isEmpty(currentUser) && currentUser.member_status !== "Basic" ? (
              <div>({currentPost.user.full_name})&nbsp;</div>
            ) : null}
          </div>
        ) : (
          <div className="fw-bold text-secondary">Deleted User&nbsp;</div>
        )}
        <div className="fst-italic text-secondary" style={{ fontSize: "14px" }}>
          {currentPost.date_of_post_ago}
        </div>
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
