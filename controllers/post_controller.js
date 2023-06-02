const User = require("../models/user");
const Post = require("../models/post");
const Comment = require("../models/comment");

const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");

//custom middlware
const { postValidation } = require("../middleware/postValidation");

//GET post creation page
exports.post_create_get = asyncHandler(async (req, res, next) => {
  res.send({
    user: req.user,
  });
});

//POST post creation page
exports.post_create_post = [
  //validation of form inputs
  postValidation,

  asyncHandler(async (req, res, next) => {
    //get poster
    //const poster = User.findById(req.user.id).exec();

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
      res.send({
        errors: results.array(),
      });
    } else {
      await post.save();
      res.send({
        user: req.user,
        post,
      });
    }
  }),
];

//POST post deletion page
exports.post_delete_post = asyncHandler(async (req, res, next) => {
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
    res.status(404).json({ error: "Post could not be found" });
  }

  //get all related comments and replies in this post. will need recursion to find replies
  const directCommentsId = currentPost.comments.map((comment) => comment._id);
  const indirectCommentsId = currentPost.comments
    .map((comment) => comment.replies)
    .flat()
    .map((reply) => reply._id);

  await Comment.deleteMany({ _id: { $in: indirectCommentsId } });
  await Comment.deleteMany({ _id: { $in: directCommentsId } });
  await Post.findByIdAndDelete(req.params.id);
  res.send({ post: currentPost, directCommentsId, indirectCommentsId });
});

//POST post creation page
exports.post_detail = asyncHandler(async (req, res, next) => {
  const post = await Post.findById(req.params.id)
    .populate({ path: "user", options: { retainNullValues: true } })
    .populate({
      path: "comments",
      populate: [
        { path: "user", options: { retainNullValues: true } },
        {
          path: "replies",
          populate: [{ path: "user", options: { retainNullValues: true } }],
        },
      ],
    })
    .exec();

  if (post === null) {
    res.status(404).json({ error: "Post could not be found" });
  }

  res.send({
    user: req.user,
    post,
  });
});
