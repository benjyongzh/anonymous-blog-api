var express = require("express");
var router = express.Router();

const passport = require("passport");
const bcrypt = require("bcryptjs");
const User = require("../models/user");

/* GET login page. */
router.get("/login", (req, res) => {
  res.render("login_page");
});

/* POST login page. */
router.post(
  "/login",

  //validate and sanitize form here

  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/",
  })
);

/* GET signup page. */
router.get("/signup", (req, res) => {
  res.render("signup_page");
});

/* POST signup page. */
router.post("/signup", async (req, res, next) => {
  //validate and sanitize form here

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
});

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
