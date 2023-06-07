var express = require("express");
var router = express.Router();
const asyncHandler = require("express-async-handler");
const User = require("../models/user");

const userController = require("../controllers/user_controller");
const { verifyToken } = require("../middleware/jwtVerification");

/* GET login page. */
router.get("/login", (req, res) => {
  return res.status(200).json({ message: "Login page" });
});

/* POST login page. */
router.post("/login", userController.user_login_post);

/* GET signup page. */
router.get("/signup", (req, res) => {
  return res.status(200).json({ message: "Sign up page" });
});

/* POST signup page. */
router.post("/signup", userController.user_signup_post);

/* GET logging out page. */
router.post(
  "/loggingout",
  verifyToken,
  asyncHandler(async (req, res, next) => {
    const bearerHeader = req.headers["authorization"];
    const bearerToken = bearerHeader && bearerHeader.split(" ")[1];
    if (bearerToken == null) {
      //auth error
      return res
        .status(401)
        .json({ errors: [{ message: "Authorization Token Failed" }] });
    } else {
      //delete bearerToken from currentTokens
      const currentTokens = req.user.auth_tokens;

      //check if bearerToken exists in DB
      const curentTokensTokenOnly = currentTokens.map((t) => t.token);
      if (!curentTokensTokenOnly.includes(bearerToken)) {
        return res.status(403).json({
          errors: [
            { message: `Auth token could not be found: ${bearerToken}` },
          ],
          currentTokens,
        });
      }

      //set tokens left in DB
      const remainingTokens = currentTokens.filter(
        (tokenObject) => tokenObject.token !== bearerToken
      );

      //update user document w ith new array of tokens to exclude current token
      await User.findByIdAndUpdate(req.user._id, {
        auth_tokens: remainingTokens,
      }).then((user) =>
        // res.status(303).json({ user, removedToken: bearerToken })
        res.status(303).redirect(`/auth/logout/${user._id}`)
      );
    }
  })
);

/* GET logged out page. */
router.get("/logout/:id", (req, res, next) => {
  return res
    .status(200)
    .json({ message: `Logout page of user ${req.params.id}` });
});

module.exports = router;
