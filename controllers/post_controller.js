const User = require("../models/user");
const Post = require("../models/post");

const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");

//custom middlware

//GET post creation page
exports.post_create_get = asyncHandler(async (req, res, next) => {
  res.render("post_create_page", {});
});

//POST post creation page
exports.post_create_post = [
  //validation of form inputs

  asyncHandler(async (req, res, next) => {}),
];

//POST post creation page
exports.post_detail = asyncHandler(async (req, res, next) => {
  const post = Post.findById(req.params.id)
    .populate("user")
    .populate("comments")
    .exec();

  if (post === null) {
    const err = new Error("Post could not be found");
    err.status = 404;
    return next(err);
  }

  res.render("post_detail_page", {
    post: post,
  });
});
