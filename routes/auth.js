var express = require("express");
var router = express.Router();

const userController = require("../controllers/user_controller");

/* GET login page. */
router.get("/login", (req, res) => {
  res.render("login_page");
});

/* POST login page. */
router.post("/login", userController.user_login_post);

/* GET signup page. */
router.get("/signup", (req, res) => {
  res.render("signup_page");
});

/* POST signup page. */
router.post("/signup", (req, res) => {
  userController.user_signup_post;
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
