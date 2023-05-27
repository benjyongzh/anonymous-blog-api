const User = require("../models/user");
const Post = require("../models/post");
const Comment = require("../models/comment");

const asyncHandler = require("express-async-handler");

//custom middlware
const {
  commentValidation,
  replyValidation,
} = require("../middleware/commentValidation");
const { validationResult } = require("express-validator");

//POST comment creation
exports.comment_create_post = [
  //validation of comment
  commentValidation,

  asyncHandler(async (req, res, next) => {
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
    const results = validationResult(req);
    if (!results.isEmpty()) {
      //there are errors in validation
      res.render("post_detail_page", {
        user: req.user,
        post: post,
        new_comment: req.body.new_comment,
        errors: results.array(),
      });
    } else {
      //add comment to post's comment array
      const newComment = new Comment({
        text: req.body.new_comment,
        user: req.user,
        date_of_comment: Date.now(),
      });
      await newComment.save();
      post.comments.push(newComment);
      await post.save();
      res.redirect(post.url);
    }
  }),
];

//POST comment creation
exports.reply_create_post = [
  //validation of comment reply
  replyValidation,

  asyncHandler(async (req, res, next) => {
    const [currentPost, currentComment] = await Promise.all([
      Post.findById(req.params.postid).exec(),
      Comment.findById(req.params.commentid).exec(),
    ]);

    if (currentPost === null) {
      const err = new Error("Post could not be found");
      err.status = 404;
      return next(err);
    }

    if (currentComment === null) {
      const err = new Error("Comment could not be found");
      err.status = 404;
      return next(err);
    }

    //check if validation is okay
    const results = validationResult(req);
    if (!results.isEmpty()) {
      //there are errors in validation
      res.render("post_detail_page", {
        user: req.user,
        post: currentPost,
        new_reply: req.body.new_reply,
        errors: results.array(),
      });
    } else {
      //add comment to comment's reply array
      const newReply = new Comment({
        text: req.body.new_reply,
        user: req.user,
        date_of_comment: Date.now(),
      });
      await newReply.save();
      currentComment.replies.push(newReply);
      await currentComment.save();
      res.redirect(currentPost.url);
    }
  }),
];
