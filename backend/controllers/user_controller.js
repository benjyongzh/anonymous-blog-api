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
const { memberUserValidation } = require("../middleware/memberUserValidation");

//JWT
const {
  verifyToken,
  verifyTokenOptional,
} = require("../middleware/jwtVerification");

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
            errors: [
              { path: "generic", message: "Invalid username and/or password" },
            ],
          });
        }

        // generate a signed son web token with the contents of user object and return it in the response
        jwt.sign(
          {
            _id: user._id,
            username: user.username, //should remove for production
            member_status: user.member_status, //should remove for production
          },
          process.env.JWT_SECRET_KEY,
          { expiresIn: "1d" },
          async (err, token) => {
            if (err) {
              return res.status(401).json({ errors: [err] });
            }
            let oldTokens = user.auth_tokens || [];
            if (oldTokens.length > 0) {
              oldTokens = oldTokens.filter((t) => {
                const timeDiff = (Date.now() - parseInt(t.signedAt)) / 1000;
                // console.log(timeDiff);
                // token is less than 1 day old. keep token. otherwise, filter out
                return timeDiff < 86400;
              });
            }

            //add new token to user document
            await User.findByIdAndUpdate(user._id, {
              auth_tokens: [
                ...oldTokens,
                { token, signedAt: Date.now().toString() },
              ],
            }).then((user) => res.json({ user, token })); //this is where a redirect would need to happen. after successful login
          }
        );
      }
    )(req, res);
  },
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
        return res.json({
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

          // generate a signed son web token with the contents of user object and return it in the response
          jwt.sign(
            {
              _id: user._id,
              username: user.username, //should remove for production
              member_status: user.member_status, //should remove for production
            },
            process.env.JWT_SECRET_KEY,
            async (err, token) => {
              if (err) {
                return res.status(401).json({ errors: [err] });
              }
              await User.findByIdAndUpdate(user._id, {
                auth_tokens: [{ token, signedAt: Date.now().toString() }],
              }).then((user) => res.json({ user, token }));
            }
          );
        });
        // });
      }
    } catch (err) {
      return next(err);
    }
  }),
];

//non-existent user page
exports.user_nonexist = [
  verifyTokenOptional,
  (req, res, next) => {
    return res.status(404).json({
      errors: [{ path: "generic", message: "User could not be found" }],
    });
  },
];

//display list of all posts of this user
exports.user_detail = [
  verifyTokenOptional,
  asyncHandler(async (req, res, next) => {
    const userToFind = await User.findById(req.params.id).exec();
    if (userToFind === null) {
      return res.status(404).json({
        errors: [{ path: "generic", message: "User could not be found" }],
      });
    }

    const posts = await Post.find({ user: userToFind })
      .sort({ date_of_post: 1 })
      .exec();

    //check if req.user exists, and if same as userToLookAt, and member_status to see first_name last_name
    if (!req.user) {
      //GET without sign in
      return res.status(200).json({
        userToLookAt: {
          _id: userToFind._id,
          username: userToFind.username,
          member_status: userToFind.member_status,
          url: userToFind.url,
        },
        sameUser: false,
        posts,
      });
    } else {
      //GET with sign in
      //viewing user is looking at own account
      if (req.user._id.toString() === req.params.id) {
        return res.status(200).json({
          userToLookAt: {
            _id: userToFind._id,
            first_name: userToFind.first_name,
            last_name: userToFind.last_name,
            full_name: userToFind.full_name,
            username: userToFind.username,
            member_status: userToFind.member_status,
            url: userToFind.url,
          },
          sameUser: true,
          posts,
        });
      } else {
        //signed in, but looking at other users
        return res.status(200).json({
          userToLookAt: {
            _id: userToFind._id,
            first_name:
              req.user.member_status !== "Basic" ? userToFind.first_name : "",
            last_name:
              req.user.member_status !== "Basic" ? userToFind.last_name : "",
            full_name:
              req.user.member_status !== "Basic" ? userToFind.full_name : "",
            username: userToFind.username,
            member_status: userToFind.member_status,
            url: userToFind.url,
          },
          sameUser: false,
          posts,
        });
      }
    }
  }),
];

//GET membership status option
exports.user_memberstatus_get = [
  verifyToken,
  memberUserValidation,
  asyncHandler(async (req, res, next) => {
    const userToLookAt = await User.findById(req.params.id).exec();

    //check if req.user is same as userToLookAt. return the form's select controls
    if (req.user._id.toString() === req.params.id) {
      return res.status(200).json({});
    } else {
      return res
        .status(403)
        .json({ message: "Unauthorized to alter membership of another user." });
    }
  }),
];

//POST membership status option
exports.user_memberstatus_post = [
  verifyToken,
  //validate passcodes
  passcodeCheck,
  memberUserValidation,

  asyncHandler(async (req, res, next) => {
    const userToLookAt = await User.findById(req.params.id).exec();

    //check passcode validation
    const results = validationResult(req);
    if (!results.isEmpty()) {
      //wrong passcode input
      return res.json({
        errors: results.array(),
      });
    } else {
      //check if req.user is same as userToLookAt
      if (req.user._id.toString() === req.params.id.toString()) {
        //update user object into db
        userToLookAt.member_status = req.body.new_membership;
        await userToLookAt.save();
        return res
          .status(201)
          .json({ new_membership_status: req.body.new_membership });
      } else {
        return res.status(403).json({
          message: "Unauthorized to alter membership of another user.",
        });
      }
    }
  }),
];
