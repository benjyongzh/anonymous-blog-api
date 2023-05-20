const User = require("../models/user");
const Post = require("../models/post");

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
  const allPosts = await Post.find({}).sort({ date_of_post: 1 }).exec();

  //check if logged in or not

  res.render("index", {
    posts: allPosts,
  });
});
