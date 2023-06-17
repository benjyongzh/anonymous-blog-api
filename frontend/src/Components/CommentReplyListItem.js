import { Link } from "react-router-dom";
import { isEmpty } from "lodash";

function CommentReplyListItem(props) {
  const { comment: currentComment, reply } = props;

  return (
    <li
      className="list-group-item bg-light py-2 border-bottom border-secondary border-2"
      style={{ paddingRight: "0px" }}
    >
      {!isEmpty(reply.user) ? null : null}
      <p classname="mb-1 mt-2">{reply.text_escaped}</p>
      <p className="mb-0">
        <em>{reply.date_of_comment_ago}</em>
      </p>
    </li>
  );
}

export default CommentReplyListItem;
