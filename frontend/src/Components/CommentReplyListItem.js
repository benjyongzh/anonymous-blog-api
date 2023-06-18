import { Link } from "react-router-dom";
import { isEmpty } from "lodash";

function CommentReplyListItem(props) {
  const { comment: currentComment, reply, isByPoster } = props;

  return (
    <li
      className="list-group-item bg-light py-2 border-bottom border-secondary border-2"
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
      {isByPoster ? <span className="badge text-bg-primary">OP</span> : null}
      <p className="mb-1 mt-2">{reply.text}</p>
      <p className="mb-0">
        <em>{reply.date_of_comment_ago}</em>
      </p>
    </li>
  );
}

export default CommentReplyListItem;
