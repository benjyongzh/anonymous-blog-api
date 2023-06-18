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
const { verifyToken } = require("../middleware/jwtVerification");

//POST comment creation
exports.comment_create_post = [
  //validation of comment
  verifyToken,
  commentValidation,

  asyncHandler(async (req, res, next) => {
    const post = await Post.findById(req.params.id)
      .populate("user")
      .populate({ path: "comments", model: Comment })
      .exec();

    if (post === null) {
      return res.status(404).json({
        errors: [{ message: "Post could not be found" }],
      });
    }

    //check if validation is okay
    const results = validationResult(req);
    if (!results.isEmpty()) {
      //there are errors in validation
      return res.json({ user: req.user, errors: results.array() });
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
      return res.status(201).json({ newComment, post });
    }
  }),
];

//POST comment creation
exports.reply_create_post = [
  verifyToken,
  //validation of comment reply
  replyValidation,

  asyncHandler(async (req, res, next) => {
    const [currentPost, currentComment] = await Promise.all([
      Post.findById(req.params.postid).exec(),
      Comment.findById(req.params.commentid).exec(),
    ]);

    if (currentPost === null) {
      return res.status(404).json({
        errors: [{ message: "Post could not be found" }],
      });
    }

    if (currentComment === null) {
      return res.status(404).json({
        errors: [{ message: "Comment could not be found" }],
      });
    }

    //check if validation is okay
    const results = validationResult(req);
    if (!results.isEmpty()) {
      //there are errors in validation
      return res.json({
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
      return res.status(201).json({ newReply, currentComment });
    }
  }),
];
