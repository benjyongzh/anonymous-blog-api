import { Link } from "react-router-dom";
import { isEmpty } from "lodash";

function CommentReplyListItem(props) {
  const { comment: currentComment, reply, isByPoster } = props;

  return (
    <li
      className="list-group-item py-2 border-bottom-2 border-secondary-subtle"
      style={{ paddingRight: "0px" }}
    >
      {!isEmpty(reply.user) ? (
        <Link className="fw-bold link-primary" to={reply.user.url}>
          {reply.user.username}
        </Link>
      ) : (
        <Link className="fw-bold link-secondary" to="/users/null">
          Deleted User
        </Link>
      )}
      <span>&nbsp;&nbsp;</span>
      {reply.isPoster || isByPoster ? (
        <span className="badge text-bg-primary">OP</span>
      ) : null}
      <p className="mb-1 mt-2">{reply.text}</p>
      <p
        className="mb-0 fst-italic text-secondary"
        style={{ fontSize: "12px" }}
      >
        {reply.date_of_comment_ago}
      </p>
    </li>
  );
}

export default CommentReplyListItem;
