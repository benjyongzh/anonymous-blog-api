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

//display list of all brands
exports.user_detail = asyncHandler(async (req, res, next) => {
  const [currentUser, posts] = await Promise.all([
    User.findById(req.params.id).exec(),
    Post.find({ user: req.params.id }).sort({ date_of_post: 1 }).exec(),
  ]);

  res.render("user_detail", {
    user: currentUser,
    posts: posts,
  });
});
