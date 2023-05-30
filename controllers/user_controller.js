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
const { passwordCheck } = require("../middleware/passwordValidation");
const {
  memberStatusValidation,
} = require("../middleware/memberStatusValidation");
const { passcodeCheck } = require("../middleware/membershipCodeValidation");

//membership status upgrade codes
require("dotenv").config();

//POST log-in of user
exports.user_login_post = [
  //validate and sanitize form here
  usernameValidation,
  passwordCheck,

  //check for errors before passport steps in
  (req, res, next) => {
    const validationResults = validationResult(req);

    if (!validationResults.isEmpty()) {
      //authentication failed
      let temp_user = new User({
        username: req.body.username,
      });
      res.render("login_page", {
        page_name: "login_page",
        signing_user: temp_user,
        errors: validationResults.array(),
      });
    } else {
      next();
    }
  },

  passport.authenticate("local", {
    successRedirect: "/",
    failWithError: true,
    failureMessage: true,
  }),
  function (err, req, res, next) {
    //authentication failed
    let temp_user = new User({
      username: req.body.username,
    });

    //error is in validation or make up invalid error
    return res.render("login_page", {
      page_name: "login_page",
      signing_user: temp_user,
      errors: [{ path: "generic", msg: "Invalid username and/or password" }],
    });
  },
];

//POST sign-up of user
exports.user_signup_post = [
  //validate and sanitize form here
  nameValidation,
  usernameValidation,
  passwordCheck,
  memberStatusValidation,

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
          member_status: req.body.member_status,
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
            member_status: req.body.member_status,
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

exports.user_nonexist = (req, res, next) => {
  res.render("user_detail_nonexist_page", {
    user: req.user,
    backURL: req.header.referer || "/",
  });
};

//display list of all posts of this user
exports.user_detail = asyncHandler(async (req, res, next) => {
  const userToFind = await User.findById(req.params.id).exec();
  if (userToFind === null) {
    res.redirect("/user/null");
  }

  const posts = await Post.find({ user: userToFind })
    .sort({ date_of_post: 1 })
    .exec();

  res.render("user_detail_page", {
    page_name: "user_detail",
    userToLookAt: userToFind,
    user: req.user,
    posts: posts,
  });
});

//GET membership status option
exports.user_memberstatus_get = asyncHandler(async (req, res, next) => {
  const userToLookAt = await User.findById(req.params.id).exec();
  //check for errors
  if (userToLookAt === null) {
    // no such user
    const err = new Error("User not found");
    err.status = 404;
    return next(err);
  }

  res.render("user_member_status_page", {
    userToLookAt: userToLookAt,
    user: req.user,
  });
});

//POST membership status option
exports.user_memberstatus_post = [
  //validate passcodes
  passcodeCheck,

  asyncHandler(async (req, res, next) => {
    const userToLookAt = await User.findById(req.params.id).exec();

    //check for errors
    if (userToLookAt === null) {
      // no such user
      const err = new Error("User not found");
      err.status = 404;
      return next(err);
    }

    //check passcode validation
    const results = validationResult(req);
    if (!results.isEmpty()) {
      //wrong passcode input
      res.render("user_member_status_page", {
        userToLookAt: userToLookAt,
        user: req.user,
        errors: results.array(),
      });
    } else {
      //update user object into db
      await User.findByIdAndUpdate(
        req.params.id,
        { member_status: req.body.new_membership },
        {}
      );
      res.redirect(userToLookAt.url);
    }
  }),
];
