var express = require("express");
var router = express.Router();
const asyncHandler = require("express-async-handler");
const User = require("../models/user");

const userController = require("../controllers/user_controller");
const { verifyToken } = require("../middleware/jwtVerification");

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
router.get(
  "/loggingout",
  verifyToken,
  asyncHandler(async (req, res, next) => {
    const bearerHeader = req.headers["authorization"];
    const bearerToken = bearerHeader && bearerHeader.split(" ")[1];
    if (bearerToken == null) {
      //auth error
      return res.status(401).json("Authorization Token Failed");
    } else {
      //delete bearerToken from currentTokens
      const currentTokens = req.user.auth_tokens;
      console.log(currentTokens);
      const remainingTokens = currentTokens.filter(
        (tokenObject) => tokenObject.token !== bearerToken
      );
      console.log(remainingTokens);
      await User.findByIdAndUpdate(req.user._id, {
        auth_tokens: remainingTokens,
      }).then((user) => res.status(200).json({ user }));
    }
  })
);

/* GET logged out page. */
router.get("/logout", (req, res, next) => {
  return res.status(200).json("Logout page");
});

module.exports = router;
