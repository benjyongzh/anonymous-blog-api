const User = require("../models/user");
const Post = require("../models/post");

const asyncHandler = require("express-async-handler");
const { validationResult } = require("express-validator");

// passport
const passport = require("passport");
const bcrypt = require("bcryptjs");

//custom middleware
const { nameValidation } = require("../middleware/nameValidation");
const { usernameValidation } = require("../middleware/usernameValidation");
const { passwordValidation } = require("../middleware/passwordValidation");

//POST log-in of user
exports.user_login_post = [
  //validate and sanitize form here
  usernameValidation,
  passwordValidation,

  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/login",
  }),
];

//POST sign-up of user
exports.user_signup_post = [
  //validate and sanitize form here
  nameValidation,
  usernameValidation,
  passwordValidation,

  asyncHandler(async (req, res, next) => {
    try {
      const results = validationResult(req);
      if (!results.isEmpty()) {
        //there are validation errors
        const temp_user = new User({
          first_name: req.body.first_name,
          last_name: req.body.last_name,
          username: req.body.username,
          password: "",
          member_status: "Normal",
        });

        res.render("signup_page", { user: temp_user, errors: results.array() });
      } else {
        bcrypt.hash(req.body.password, 10, async (err, hashedPassword) => {
          const user = new User({
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            username: req.body.username,
            password: hashedPassword,
            member_status: "Normal",
          });

          const result = await user.save();
          res.redirect("/");
        });
      }
    } catch (err) {
      return next(err);
    }
  }),
];

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
