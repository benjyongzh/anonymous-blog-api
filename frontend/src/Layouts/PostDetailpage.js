import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axiosInstance from "../api/axios";
import { isEmpty } from "lodash";

import { useDispatch, useSelector } from "react-redux";
import { setPageName } from "../Features/page/pageSlice";

import LoadingMessage from "../Components/LoadingMessage";
import TextAreaInput from "../Components/TextAreaInput";
import PostCommentListItem from "../Components/PostCommentListItem";

const PostDetailpage = () => {
  const [currentPost, setCurrentPost] = useState({});
  const [ownPost, setOwnPost] = useState(false);
  const [canDelete, setCanDelete] = useState(false);
  const currentUser = useSelector((state) => state.auth.user);
  // const pageName = useSelector((state) => state.page.pageName);

  const [errors, setErrors] = useState([]);
  const [newComment, setNewComment] = useState("");

  const dispatch = useDispatch();

  const getData = async () => {
    await axiosInstance
      .get(`${location.pathname}`)
      .then((response) => {
        console.log("Post Detail page response: ", response.data);
        setCurrentPost(response.data.post);
        setOwnPost(response.data.ownPost);
        setCanDelete(response.data.canDelete);
      })
      .catch((error) => {
        console.log(error);
        setErrors([{ path: "generic", msg: "Connection to server failed" }]);
      });
  };
  //componentOnMount
  useEffect(() => {
    dispatch(setPageName("post_detail"));
    //do fetching
    getData();
  }, []);

  const handleSubmitComment = () => {};

  return (
    <div
      className="d-flex flex-column align-items-stretch justify-content-center container"
      style={{ maxWidth: "900px" }}
    >
      {isEmpty(currentPost) ? (
        <LoadingMessage path="Async post" message={"post info..."} />
      ) : (
        <div>
          {/* header */}
          <div className="d-flex flex-wrap mt-2 mb-0">
            {/* post OP and date of posting */}
            {currentPost.user !== null ? (
              <div>
                <Link
                  className="fw-bold link-primary"
                  to={currentPost.user.url}
                >
                  {currentPost.user.username}
                </Link>
                <span>
                  {!isEmpty(currentPost.user.full_name)
                    ? ` (${currentPost.user.full_name})`
                    : ""}
                </span>
              </div>
            ) : (
              <Link className="fw-bold link-secondary" to="/users/null">
                Deleted User
              </Link>
            )}
            <span>&nbsp;-&nbsp;</span>
            <p className="mb-0">
              posted on {currentPost.date_of_post_formatted}{" "}
              <em>({currentPost.date_of_post_ago})</em>
            </p>

            {/* delete button for admins */}
            {canDelete ? (
              <form
                className="ms-auto"
                method="POST"
                action={`${location.pathname}/delete`}
              >
                <button
                  className="btn btn-outline-danger btn-sm text-center align-top"
                  style={{ borderWidth: "0px", maxWidth: "250px" }}
                  type="submit"
                >
                  <i className="bx bxs-trash align-bottom mb-1"></i>
                </button>
              </form>
            ) : null}

            {/* post content */}
            <h3 className="mt-2">{currentPost.title_escaped}</h3>
            <p>{currentPost.text_escaped}</p>
            <hr className="mt-0" />
            <h5>
              {currentPost.comments.length === 1 ? "Comment" : "Comments"}
            </h5>

            {/* comment input section */}
            {!isEmpty(currentUser) ? (
              <div>
                <form
                  onSubmit={handleSubmitComment}
                  method="POST"
                  action={`/posts/${currentPost._id}/comment/create`}
                >
                  <TextAreaInput
                    inputName="new_comment"
                    placeholder="Max. 300 characters"
                    inputRequired={false}
                    labelText={`Comment as ${user.username}`}
                    errors={errors}
                    handleChange={setNewComment}
                    value={newComment}
                  />
                  <div className="d-flex justify-content-end">
                    <button
                      className="w-100 btn btn-primary"
                      type="submit"
                      style={{ maxWidth: "250px" }}
                    >
                      Comment
                    </button>
                  </div>
                </form>
                <hr />
              </div>
            ) : null}

            {/* comments section */}
            {currentPost.comments.length > 0 ? (
              <ul className="list-group list-group-flush">
                {currentPost.comments.map((comment) => (
                  <PostCommentListItem
                    post={currentPost}
                    currentUser={currentUser}
                    comment={comment}
                  />
                ))}
              </ul>
            ) : (
              <p>No comments posted yet.</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default PostDetailpage;
