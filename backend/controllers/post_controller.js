const User = require("../models/user");
const Post = require("../models/post");
const Comment = require("../models/comment");

const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");

//custom middlware
const { postValidation } = require("../middleware/postValidation");
const {
  verifyToken,
  verifyTokenOptional,
} = require("../middleware/jwtVerification");

//GET post creation page
exports.post_create_get = [
  verifyToken,

  asyncHandler(async (req, res, next) => {
    return res.status(200).json({});
  }),
];

//POST post creation page
exports.post_create_post = [
  verifyToken,
  //validation of form inputs
  postValidation,

  asyncHandler(async (req, res, next) => {
    const post = new Post({
      title: req.body.title,
      text: req.body.text,
      user: req.user,
      date_of_post: Date.now(),
      comments: [],
    });

    const results = validationResult(req);
    if (!results.isEmpty()) {
      // there are validation errors
      return res.json({
        errors: results.array(),
      });
    } else {
      await post.save();
      return res.status(200).json({
        post,
      });
    }
  }),
];

//POST post deletion page
exports.post_delete_post = [
  verifyToken,
  asyncHandler(async (req, res, next) => {
    //get poster
    const currentPost = await Post.findById(req.params.id)
      .populate({
        path: "comments",
        populate: [
          {
            path: "replies",
          },
        ],
      })
      .exec();

    if (currentPost === null) {
      return res.status(404).json({ error: "Post could not be found" });
    }

    //check if req.user is an admin
    if (req.user.member_status === "Admin") {
      //get all related comments and replies in this post. will need recursion to find replies
      const directCommentsId = currentPost.comments.map(
        (comment) => comment._id
      );
      const indirectCommentsId = currentPost.comments
        .map((comment) => comment.replies)
        .flat()
        .map((reply) => reply._id);

      await Comment.deleteMany({ _id: { $in: indirectCommentsId } });
      await Comment.deleteMany({ _id: { $in: directCommentsId } });
      await Post.findByIdAndDelete(req.params.id);
      return res.json({
        post: currentPost,
        directCommentsId,
        indirectCommentsId,
      });
    } else {
      return res
        .status(403)
        .json({ message: "Unauthorized to perform this action." });
    }
  }),
];

//POST post creation page
exports.post_detail = [
  verifyTokenOptional,
  asyncHandler(async (req, res, next) => {
    const post = await Post.findById(req.params.id)
      .populate({
        path: "user",
        options: { retainNullValues: true },
        select: `username url ${
          req.user && req.user.member_status !== "Basic"
            ? "first_name last_name"
            : ""
        }`,
      })
      .populate({
        path: "comments",
        populate: [
          {
            path: "user",
            options: { retainNullValues: true },
            select: `username url ${
              req.user && req.user.member_status !== "Basic"
                ? "first_name last_name"
                : ""
            }`,
          },
          {
            path: "replies",
            populate: [
              {
                path: "user",
                options: { retainNullValues: true },
                select: `username url ${
                  req.user && req.user.member_status !== "Basic"
                    ? "first_name last_name"
                    : ""
                }`,
              },
            ],
          },
        ],
      })
      .exec();

    if (post === null) {
      return res.status(404).json({ error: "Post could not be found" });
    }

    //check if req.user and if this is own post, and member_status of req.user to see OP's full name
    return res.status(200).json({
      post,
      ownPost: req.user && req.user._id.toString() === post.user._id,
      canDelete: req.user && req.user.member_status === "Admin",
    });
  }),
];
