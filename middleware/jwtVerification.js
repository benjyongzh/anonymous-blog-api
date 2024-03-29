//jwt verification
const jwt = require("jsonwebtoken");
require("dotenv").config();
const User = require("../models/user");

const isEmpty = require("lodash").isEmpty;

function tokenIsOptional(req, res, next) {
  req.body.tokenOptional = true;
  next();
}

function checkToken(req, res, next) {
  //get auth header value
  const bearerHeader = req.headers["authorization"];
  //format of token:
  // authorization: Bearer <access_token>

  //check if bearer is undefined
  //split at space
  const bearerToken = bearerHeader && bearerHeader.split(" ")[1];
  //check if logged in or forbidden
  if (isEmpty(bearerToken)) {
    if (req.body.tokenOptional) {
      next();
    } else {
      return res
        .status(401)
        .json({ errors: [{ message: "Must log in first" }] });
    }
  } else {
    //valid token
    jwt.verify(
      bearerToken,
      process.env.JWT_SECRET_KEY,
      async (err, authData) => {
        if (err) {
          return res.status(403).json({ errors: [err] });
          //this runs if the token has expired, returning err as:
          // {
          //   "name": "TokenExpiredError",
          //   "message": "jwt expired",
          //   "expiredAt": <expiry Date()>
          // }
        } else {
          //check if token is in user's db document
          let authUser = await User.findById(authData._id).exec();
          if (isEmpty(authUser)) {
            //auth token does not give a valid user at all
            return res
              .status(403)
              .json({ errors: [{ message: "Invalid auth token" }] });
          }
          let authTokensInUse = authUser.auth_tokens.map(
            (tokenObject) => tokenObject.token
          );
          if (authTokensInUse.includes(bearerToken)) {
            //auth token is still in DB
            req.user = authUser;
            next();
          } else {
            //auth token is no longer in DB
            return res
              .status(403)
              .json({ errors: [{ message: "Auth token no longer valid" }] });
          }
        }
      }
    );
  }
}

const verifyToken = [checkToken];
const verifyTokenOptional = [tokenIsOptional, checkToken];

module.exports = { verifyToken, verifyTokenOptional };
