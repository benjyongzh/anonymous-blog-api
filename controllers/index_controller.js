const User = require("../models/user");
const Post = require("../models/post");

const asyncHandler = require("express-async-handler");

//custom middlware
const { verifyTokenOptional } = require("../middleware/jwtVerification");

//GET main page, sort posts according to date of posting
exports.main_page_get = [
  verifyTokenOptional,
  asyncHandler(async (req, res, next) => {
    const allPosts = await Post.find({})
      .populate({ path: "user", options: { retainNullValues: true } })
      .sort({ date_of_post: 1 })
      .exec();

    return res.status(200).json({
      user: req.user,
      posts: allPosts,
    });
  }),
];
