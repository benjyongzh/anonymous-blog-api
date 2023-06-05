const User = require("../models/user");
const Post = require("../models/post");

const asyncHandler = require("express-async-handler");
const { validationResult } = require("express-validator");

// passport
const passport = require("passport");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();

//custom middleware
const { nameValidation } = require("../middleware/nameValidation");
const {
  usernameAlreadyInUse,
  usernameSanitize,
} = require("../middleware/usernameValidation");
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
  usernameSanitize,
  passwordCheck,

  //check for errors before passport steps in
  (req, res, next) => {
    const validationResults = validationResult(req);

    if (!validationResults.isEmpty()) {
      //authentication failed
      // let temp_user = new User({
      //   username: req.body.username,
      // });
      return res.json({
        // signing_user: temp_user,
        errors: validationResults.array(),
      });
    } else {
      next();
    }
  },

  //JWT
  (req, res, next) => {
    passport.authenticate(
      "local",
      { session: false, failWithError: true, failureMessage: true },
      (err, user, info) => {
        if (err || !user) {
          return res.json({
            errors: { message: "Invalid username and/or password" },
            user: user,
          });
        }

        // req.login(user, { session: false }, (err) => {
        //   if (err) {
        //     return res.json(err);
        //   }

        // generate a signed son web token with the contents of user object and return it in the response
        jwt.sign(user, process.env.JWT_SECRET_KEY, (err, token) => {
          return res.json({ user, token });
        });

        // });
      }
    )(req, res);
  },

  /* passport.authenticate("local", {
    successRedirect: "/",
    failWithError: true,
    failureMessage: true,
  }),
  function (err, req, res, next) {
    //authentication failed
    // let temp_user = new User({
    //   username: req.body.username,
    // });

    //error is in validation or make up invalid error
    return res.send({
      // page_name: "login_page",
      // signing_user: temp_user,
      errors: { path: "generic", msg: "Invalid username and/or password" },
    });
  }, */
];

//POST sign-up of user
exports.user_signup_post = [
  //validate and sanitize form here
  nameValidation,
  usernameSanitize,
  usernameAlreadyInUse,
  passwordCheck,
  memberStatusValidation,

  asyncHandler(async (req, res, next) => {
    try {
      const results = validationResult(req);
      if (!results.isEmpty()) {
        //there are validation errors
        // const temp_user = new User({
        //   first_name: req.body.first_name,
        //   last_name: req.body.last_name,
        //   username: req.body.username,
        //   password: "",
        //   member_status: req.body.member_status,
        // });

        return res.json({
          // page_name: "signup_page",
          // signing_user: temp_user,
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
            return res.json(result);
          });
        });
      }
    } catch (err) {
      return next(err);
    }
  }),
];

//non-existent user page
exports.user_nonexist = (req, res, next) => {
  res.status(404).json({ error: "User could not be found" });
};

//display list of all posts of this user
exports.user_detail = asyncHandler(async (req, res, next) => {
  const userToFind = await User.findById(req.params.id).exec();
  if (userToFind === null) {
    res.status(404).json({ error: "User could not be found" });
  }

  const posts = await Post.find({ user: userToFind })
    .sort({ date_of_post: 1 })
    .exec();

  return res.json({
    userToLookAt: userToFind,
    user: req.user,
    posts,
  });
});

//GET membership status option
exports.user_memberstatus_get = asyncHandler(async (req, res, next) => {
  const userToLookAt = await User.findById(req.params.id).exec();
  //check for errors
  if (userToLookAt === null) {
    // no such user
    res.status(404).json({ error: "User could not be found" });
  }

  return res.json({
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
      res.status(404).json({ error: "User could not be found" });
    }

    //check passcode validation
    const results = validationResult(req);
    if (!results.isEmpty()) {
      //wrong passcode input
      return res.json({
        errors: results.array(),
      });
    } else {
      //update user object into db
      await User.findByIdAndUpdate(
        req.params.id,
        { member_status: req.body.new_membership },
        {}
      );
      return res.json({ userToLookAt: userToLookAt, user: req.user });
    }
  }),
];
