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
    failWithError: true,
    failureMessage: true,
  }),
  function (err, req, res, next) {
    console.log(req.session.messages);
    //authentication failed
    const validationResults = validationResult(req);

    let temp_user = new User({
      username: req.body.username,
    });

    //error is in validation or make up invalid error
    return res.render("login_page", {
      page_name: "login_page",
      signing_user: temp_user,
      errors: !validationResults.isEmpty()
        ? validationResults.array()
        : [{ path: "generic", msg: "Invalid username and/or password" }],
    });
  },
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
        // console.log(results.array());

        res.render("signup_page", {
          page_name: "signup_page",
          signing_user: temp_user,
          errors: results.array(),
        });
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

          //make sure user stays logged in
          req.login(user, function (err) {
            // if (err) {
            //   return next(err);
            // }
            return res.redirect("/");
          });
        });
      }
    } catch (err) {
      return next(err);
    }
  }),
];

//display list of all posts of this user
exports.user_detail = asyncHandler(async (req, res, next) => {
  const [userToFind, posts] = await Promise.all([
    User.findById(req.params.id),
    Post.find({ user: userToFind }).sort({ date_of_post: 1 }).exec(),
  ]);

  res.render("user_detail", {
    page_name: "user_detail",
    user: userToFind,
    posts: posts,
  });
});
