const User = require("../models/user");
const Post = require("../models/post");
const Comment = require("../models/comment");

const asyncHandler = require("express-async-handler");

//custom middlware

//POST comment creation
exports.comment_create_post = asyncHandler(async (req, res, next) => {
  const post = await Post.findById(req.params.id)
    .populate("user")
    .populate({ path: "comments", model: Comment })
    .exec();

  if (post === null) {
    const err = new Error("Post could not be found");
    err.status = 404;
    return next(err);
  }

  //check if validation is okay

  //add comment to post's comment array
  res.render("post_detail_page", {
    user: req.user,
    post: post,
  });
});
