const User = require("../models/user");
const Post = require("../models/post");

const asyncHandler = require("express-async-handler");

//GET main page, sort posts according to date of posting
exports.main_page_get = asyncHandler(async (req, res, next) => {
  const allPosts = await Post.find({})
    .populate({ path: "user", options: { retainNullValues: true } })
    .sort({ date_of_post: 1 })
    .exec();

  return res.json({
    user: req.user,
    posts: allPosts,
  });
});
