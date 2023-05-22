var express = require("express");
var router = express.Router();
const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");

const passport = require("passport");
const bcrypt = require("bcryptjs");
const User = require("../models/user");

const { usernameValidation } = require("../middleware/usernameValidation");
const { passwordValidation } = require("../middleware/passwordValidation");

/* GET login page. */
router.get("/login", (req, res) => {
  res.render("login_page");
});

/* POST login page. */
router.post(
  "/login",

  //validate and sanitize form here
  usernameValidation,
  passwordValidation,

  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/login",
  })
);

/* GET signup page. */
router.get("/signup", (req, res) => {
  res.render("signup_page");
});

/* POST signup page. */
router.post(
  "/signup",

  //validate and sanitize form here
  usernameValidation,
  passwordValidation,

  async (req, res, next) => {
    try {
      bcrypt.hash(req.body.password, 10, async (err, hashedPassword) => {
        const user = new User({
          username: req.body.username,
          password: hashedPassword,
        });
        const result = await user.save();

        res.redirect("/");
      });
    } catch (err) {
      return next(err);
    }
  }
);

/* GET logging out page. */
router.get("/loggingout", (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.redirect("/logout");
  });
});

/* GET logged out page. */
router.get("/logout", (req, res, next) => {
  res.render("logout_page");
});

module.exports = router;
