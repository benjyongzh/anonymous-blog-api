import { Link } from "react-router-dom";
import { isEmpty } from "lodash";

import CommentReplyListItem from "./CommentRepliesListItem";

function PostCommentListItem(props) {
  const { post, currentUser, comment, isByPoster, showCommenterFullName } =
    props;

  return (
    <div className="list-group-item bg-light">
      {/* comment info */}
      <div className="mt-2 mb-3">
        {comment.user !== null ? (
          <div>
            <Link className="fw-bold link-primary" to={comment.user.url}>
              {comment.user.username}
            </Link>
            {showCommenterFullName ? (
              <span>&nbsp;{comment.user.full_name}</span>
            ) : null}
            {isByPoster ? (
              <span className="badge text-bg-primary">
                &nbsp;{comment.user.full_name}
              </span>
            ) : null}
          </div>
        ) : (
          <Link className="fw-bold link-secondary" to="/users/null">
            Deleted User
          </Link>
        )}
        <span> - {comment.date_of_comment_ago}</span>
      </div>

      {/* comment text */}
      <p className="mb-2">{comment.text_escaped}</p>

      {/* comment bottom info */}
      <div className="mb-2">
        {/* comment control buttons */}
        <div className="d-flex gap-3 justify-content-start">
          {!isEmpty(currentUser) ? (
            <button
              className="btn btn-outline-primary btn-sm text-center align-middle px-3"
              style="border-width: 0px"
              type="button"
              data-bs-target={`#commentRepliesFor${comment._id}`}
              data-bs-toggle="collapse"
              aria-expanded="false"
              aria-controls="collapseExample"
            >
              {comment.replies.length > 0 ? (
                <span>{comment.replies.length}&nbsp;&nbsp;</span>
              ) : null}
              <i className="bx bxs-comment align-bottom mb-1"></i>
            </button>
          ) : comment.replies.length > 0 ? (
            <button
              className="btn btn-outline-primary btn-sm text-center align-middle px-3"
              style="border-width: 0px"
              type="button"
              data-bs-target={`#commentRepliesFor${comment._id}`}
              data-bs-toggle="collapse"
              aria-expanded="false"
              aria-controls="collapseExample"
            >
              <span>{comment.replies.length}&nbsp;&nbsp;</span>
              <i className="bx bxs-comment align-bottom mb-1"></i>
            </button>
          ) : (
            <Link
              to="/auth/login"
              className="btn btn-outline-primary btn-sm text-center align-middle px-3"
              style={{ borderWidth: "0px" }}
              type="button"
            >
              <i className="bx bxs-comment align-bottom mb-1"></i>
            </Link>
          )}
        </div>

        {/* replies section */}
        <div className="ps-4 collapse" id={`commentRepliesFor${comment._id}`}>
          <ul className="list-group list-group-flush border-start border-secondary border-2">
            {comment.replies.map((reply) => (
              <CommentReplyListItem
                key={comment._id}
                comment={comment}
                reply={reply}
              />
            ))}
          </ul>
          {/* form for replying */}
        </div>
      </div>
    </div>
  );
}

export default PostCommentListItem;
