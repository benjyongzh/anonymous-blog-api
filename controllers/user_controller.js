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

//sign-up of user

//log-in of user

//log-out of user

//display list of all posts of this user
exports.user_detail = asyncHandler(async (req, res, next) => {
  const [currentUser, posts] = await Promise.all([
    res.locals.currentUser,
    Post.find({ user: res.locals.currentUser })
      .sort({ date_of_post: 1 })
      .exec(),
  ]);

  res.render("user_detail", {
    user: currentUser,
    posts: posts,
  });
});
