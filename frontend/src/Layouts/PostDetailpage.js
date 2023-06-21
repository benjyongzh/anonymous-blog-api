import { Link, useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axiosInstance from "../api/axios";
import { isEmpty } from "lodash";

import { useDispatch, useSelector } from "react-redux";
import { setPageName, setMainId } from "../Features/page/pageSlice";

import LoadingMessage from "../Components/LoadingMessage";
import TextAreaInput from "../Components/TextAreaInput";
import PostCommentListItem from "../Components/PostCommentListItem";

import "../Styles/custom.css";

const PostDetailpage = () => {
  const [currentPost, setCurrentPost] = useState({});
  const [ownPost, setOwnPost] = useState(false);
  const [canDelete, setCanDelete] = useState(false);
  const [loadingFlag, setLoadingFlag] = useState(false);
  const currentUser = useSelector((state) => state.auth.user);
  // const pageName = useSelector((state) => state.page.pageName);

  const [errors, setErrors] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [newCommentIsLoading, setNewCommentIsLoading] = useState(false);
  const [deletePostConfirming, setDeletePostConfirming] = useState(false);
  const [deletePostIsLoading, setDeletePostIsLoading] = useState(false);

  let { postId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const getData = async () => {
    await axiosInstance
      .get(`${location.pathname}`)
      .then((response) => {
        console.log("Post Detail page response: ", response.data);
        setCurrentPost(response.data.post);
        dispatch(setMainId(response.data.post._id));
        setOwnPost(response.data.ownPost);
        setCanDelete(response.data.canDelete);
      })
      .catch((error) => {
        console.log(error);
        navigate("/error", {
          state: { message: "Post could not be found" },
          replace: true,
        });
      });
  };
  //componentOnMount
  useEffect(() => {
    setLoadingFlag(true);
    dispatch(setPageName("post_detail"));
    //do fetching
    getData().then((response) => setLoadingFlag(false));
  }, [postId]);

  const toggleDeleteConfirmation = () => {
    setDeletePostConfirming((curr) => !curr);
  };

  const handleDeletePost = async (event) => {
    event.preventDefault();
    setDeletePostIsLoading(true);
    await axiosInstance
      .delete(`${location.pathname}/delete`)
      .then((response) => {
        // success: redirect to homepage or backpage
        console.log("response of deleting post: ", response);
        setDeletePostIsLoading(false);
        navigate(-1);
      })
      .catch((error) => {
        //error somewhere
        console.log("error from post detail page deleting: ", error);
        setDeletePostIsLoading(false);
        navigate("/error", { state: { message: response.data.message } });
      });
  };

  const handleSubmitComment = async (event) => {
    event.preventDefault();
    setNewCommentIsLoading(true);
    await axiosInstance
      .post(
        `${location.pathname}/comments/create`,
        JSON.stringify({ new_comment: newComment })
      )
      .then((response) => {
        console.log("response of creating comment: ", response);
        if (response.data.errors) {
          //there are still errors in the form
          setErrors(response.data.errors);
          setNewCommentIsLoading(false);
        } else {
          // success: find a way to clear newComment, and display new comment object
          setNewComment("");
          setErrors([]);
          getData().then((data) => setNewCommentIsLoading(false));
        }
      })
      .catch((error) => {
        console.log("error from post detail page fetching: ", error);
        setErrors([
          { path: "new_comment", msg: "Connection to server failed" },
        ]);
        setNewCommentIsLoading(false);
      });
  };

  const handleSubmitReply = async () => {
    await getData();
  };

  return (
    <div
      className="d-flex flex-column align-items-stretch justify-content-center container"
      style={{ maxWidth: "900px" }}
    >
      {loadingFlag || isEmpty(currentPost) ? (
        <LoadingMessage path="Async post" message={"post info"} />
      ) : (
        <div>
          {/* header */}
          <div className="d-flex justify-content-between mt-2 mb-0">
            {/* post OP and date of posting */}
            <div className="d-flex flex-wrap">
              {!isEmpty(currentPost.user) ? (
                <div>
                  <Link
                    className="fw-bold link-primary"
                    to={currentPost.user.url}
                  >
                    {currentPost.user.username}
                  </Link>
                  <span>
                    {!isEmpty(currentPost.user.first_name) &&
                    !isEmpty(currentPost.user.last_name)
                      ? ` (${currentPost.user.full_name})`
                      : ""}
                  </span>
                </div>
              ) : (
                <Link className="fw-bold link-secondary" to="/users/null">
                  Deleted User
                </Link>
              )}
              <span>&nbsp;&nbsp;</span>
              <p className="mb-0 fst-italic text-secondary">
                posted on {currentPost.date_of_post_formatted} (
                {currentPost.date_of_post_ago})
              </p>
            </div>
            {/* options */}
            <div className="btn-group ms-auto mt-0">
              <button
                className="btn btn-outline-secondary border border-0 rounded-2 px-1"
                type="button"
                data-bs-toggle="dropdown"
                data-bs-auto-close="outside"
                aria-expanded="false"
              >
                <i className="bx bx-dots-vertical-rounded"></i>
              </button>
              <ul className="dropdown-menu dropdown-menu-end">
                <li>
                  <span className="dropdown-item-text">
                    Post options here. If you had one
                  </span>
                </li>
                {/* delete button for admins */}
                {canDelete ? (
                  <li>
                    {deletePostConfirming ? (
                      <form
                        className="dropdown-item-text d-flex gap-2 align-items-center justify-content-end"
                        onSubmit={handleDeletePost}
                      >
                        <div className="mx-2">Confirm delete?</div>
                        <button
                          className={`btn btn-danger btn-sm text-center align-top`}
                          style={{ borderWidth: "0px", maxWidth: "250px" }}
                          type="submit"
                        >
                          <i
                            className={`bx align-bottom mb-1 ${
                              deletePostIsLoading
                                ? "bx-loader-circle bx-spin bx-flip-horizontal"
                                : "bx-check"
                            } `}
                          ></i>
                        </button>
                        <button
                          className={`btn btn-outline-secondary btn-sm text-center align-top`}
                          style={{ borderWidth: "0px", maxWidth: "250px" }}
                          onClick={toggleDeleteConfirmation}
                          type="button"
                        >
                          <i className={`bx align-bottom mb-1 bx-x`}></i>
                        </button>
                      </form>
                    ) : (
                      <button
                        className="btn dropdown-item text-end"
                        onClick={toggleDeleteConfirmation}
                        type="button"
                      >
                        Delete
                      </button>
                    )}
                  </li>
                ) : null}
              </ul>
            </div>
          </div>

          {/* post content */}
          <h3 className="mt-2">{currentPost.title}</h3>
          <p>{currentPost.text}</p>

          {/* comment input section */}
          {!isEmpty(currentUser) ? (
            <div className="mb-3">
              <form onSubmit={handleSubmitComment}>
                <TextAreaInput
                  inputName="new_comment"
                  placeholder="Max. 300 characters"
                  inputRequired={false}
                  labelText={`Comment as ${currentUser.username}`}
                  errors={errors}
                  handleChange={setNewComment}
                  defaultValue={newComment}
                  style={{ height: "100px" }}
                />
                <div className="d-flex justify-content-end">
                  <button
                    className={`w-100 btn ${
                      newCommentIsLoading
                        ? "btn-secondary disabled"
                        : "btn-primary"
                    }`}
                    type="submit"
                    style={{ maxWidth: "250px" }}
                  >
                    {newCommentIsLoading ? "Posting comment..." : "Comment"}
                  </button>
                </div>
              </form>
            </div>
          ) : null}

          <hr className="mt-0" />
          <h5 className="mb-1">
            {currentPost.comments.length}{" "}
            {!isEmpty(currentPost.comments) && currentPost.comments.length === 1
              ? "Comment"
              : "Comments"}
          </h5>

          {/* comments section */}
          {!isEmpty(currentPost.comments) ? (
            <ul className="list-group list-group-flush">
              {currentPost.comments.map((comment) => (
                <PostCommentListItem
                  key={comment._id}
                  post={currentPost}
                  currentUser={currentUser}
                  comment={comment}
                  isByPoster={
                    comment.isPoster ||
                    (!isEmpty(comment.user) &&
                      !isEmpty(currentPost.user) &&
                      comment.user._id.toString() ===
                        currentPost.user._id.toString())
                  }
                  showCommenterFullName={
                    !isEmpty(currentUser) &&
                    currentUser.member_status !== "Basic"
                  }
                  createNewReply={handleSubmitReply}
                />
              ))}
            </ul>
          ) : null}
        </div>
      )}
    </div>
  );
};

export default PostDetailpage;
