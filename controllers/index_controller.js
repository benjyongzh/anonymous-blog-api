const User = require("../models/user");
const Post = require("../models/post");
const Comment = require("../models/comment");

const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");

//custom middlware
// const { getCountryList } = require("../middleware/countrylist");
// const {
//   getDrinksFromBrandId,
//   setInstanceStatusCount,
// } = require("../middleware/brandInstanceCount");
// const { brandFormSanitization } = require("../middleware/brandFormValidation");

//GET main page, sort posts according to date of posting
exports.main_page_get = asyncHandler(async (req, res, next) => {
  const allPosts = await Post.find({})
    .populate("user", { retainNullValues: true })
    .sort({ date_of_post: 1 })
    .exec();

  res.render("index", {
    user: req.user,
    title: "Home",
    posts: allPosts,
  });
});
