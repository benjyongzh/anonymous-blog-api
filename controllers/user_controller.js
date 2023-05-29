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
const {
  memberStatusValidation,
} = require("../middleware/memberStatusValidation");
const {
  memberPasscodeValidation,
} = require("../middleware/memberStatusValidation");

//membership status upgrade codes
require("dotenv").config();

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

//display list of all posts of this user
exports.user_detail = asyncHandler(async (req, res, next) => {
  const userToFind = await User.findById(req.params.id).exec();
  if (userToFind === null) {
    // no such user
    const err = new Error("User not found");
    err.status = 404;
    return next(err);
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
  memberPasscodeValidation,

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
      rerenderMemberPageWithErr("user_member_status_page", true, userToLookAt, {
        msg: results.array(),
      });
      return;
    } else {
      let new_status = "";
      //check which passcode is used
      if (req.body.member_password === process.env.PREMIUM_PASSCODE) {
        //premium passcode used. only basic members can use
        if (userToLookAt.member_status === "Basic") {
          new_status = "Premium";
        } else {
          //error.msg: already premium
          rerenderMemberPageWithErr(true, userToLookAt, {
            msg: "Already a premium member",
          });
          return;
        }
      } else {
        //admin passwcode used. only basic and premium members can use
        if (
          userToLookAt.member_status === "Basic" ||
          userToLookAt.member_status === "Premium"
        ) {
          new_status = "Admin";
        } else {
          //error.msg: already admin
          rerenderMemberPageWithErr(true, userToLookAt, {
            msg: "Already an admin",
          });
          return;
        }
      }
      //update user object into db
      upgradeMembership(req.params.id, new_status);
      return;
    }
  }),
];

const upgradeMembership = (userId, new_status) => {
  asyncHandler(async (req, res, next) => {
    await User.findByIdAndUpdate(userId, { member_status: new_status }, {});
    currentUser = await User.findById(userId);
    res.redirect(currentUser.url);
  });
};

const rerenderMemberPageWithErr = (loggedInBoolean, userToLookAt, err) => {
  asyncHandler(async (req, res, next) => {
    res.render("user_member_status_page", {
      userToLookAt: userToLookAt ? userToLookAt : null,
      user: loggedInBoolean ? req.user : null,
      errors: err ? err : {},
    });
  });
};
