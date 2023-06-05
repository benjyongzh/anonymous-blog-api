var express = require("express");
var router = express.Router();

const userController = require("../controllers/user_controller");

/* GET login page. */
router.get("/login", (req, res) => {
  return res.status(200).json("Login page");
});

/* POST login page. */
router.post("/login", userController.user_login_post);

/* GET signup page. */
router.get("/signup", (req, res) => {
  return res.status(200).json("Sign up page");
});

/* POST signup page. */
router.post("/signup", userController.user_signup_post);

/* GET logging out page. */
router.get("/loggingout", (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.redirect("/auth/logout");
  });
});

/* GET logged out page. */
router.get("/logout", (req, res, next) => {
  return res.status(200).json("Logout page");
});

module.exports = router;
