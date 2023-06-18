import { Link } from "react-router-dom";
import { isEmpty } from "lodash";
import { useState } from "react";
import axiosInstance from "../api/axios";

import CommentReplyListItem from "./CommentReplyListItem";
import TextAreaInput from "./TextAreaInput";

function PostCommentListItem(props) {
  const { post, currentUser, comment, isByPoster, showCommenterFullName } =
    props;

  const [errors, setErrors] = useState([]);
  const [newReply, setNewReply] = useState("");

  const handleSubmitReply = () => {};

  return (
    <div className="list-group-item bg-light">
      {/* comment info */}
      <div className="mt-2 mb-3">
        <Link
          className={`fw-bold ${
            !isEmpty(comment.user) ? "link-primary" : "link-secondary"
          }`}
          to={!isEmpty(comment.user) ? comment.user.url : "/users/null"}
        >
          {!isEmpty(comment.user) ? comment.user.username : "Deleted User"}
        </Link>
        {showCommenterFullName ? (
          <span>&nbsp;({comment.user.full_name})</span>
        ) : null}
        {isByPoster ? (
          <span className="badge text-bg-primary">&nbsp;&nbsp;OP</span>
        ) : null}
        <span> - {comment.date_of_comment_ago}</span>
      </div>

      {/* comment text */}
      <p className="mb-1">{comment.text_escaped}</p>

      {/* comment bottom info */}
      <div className="mb-2">
        {/* comment control buttons */}
        <div className="d-flex gap-3 justify-content-start">
          {!isEmpty(currentUser) ? (
            <button
              className="btn btn-outline-primary btn-sm text-center align-middle px-3"
              style={{ borderWidth: "0px" }}
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
              style={{ borderWidth: "0px" }}
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
                isByPoster={
                  reply.user._id.toString() === post.user._id.toString()
                }
              />
            ))}
          </ul>
          {/* form for replying */}
          {!isEmpty(currentUser) ? (
            <form
              className="border-start border-secondary border-2 ps-4 pt-2"
              method="POST"
              onSubmit={handleSubmitReply}
              action={`/posts/${post._id}/comment/${comment._id}/reply`}
            >
              <TextAreaInput
                inputName="new_reply"
                placeholder="Max. 100 characters"
                inputRequired={false}
                labelText="Reply with max. 100 characters"
                errors={errors}
                handleChange={setNewReply}
                defaultValue={newReply}
              />
              <div className="d-flex justify-content-end">
                <button
                  className="btn btn-primary"
                  type="submit"
                  style={{ maxWidth: "250px" }}
                >
                  Reply
                </button>
              </div>
            </form>
          ) : null}
        </div>
      </div>
    </div>
  );
}

export default PostCommentListItem;
