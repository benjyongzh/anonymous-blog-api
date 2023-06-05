//jwt verification
const jwt = require("jsonwebtoken");
require("dotenv").config();

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
  if (bearerToken == null) {
    if (req.body.tokenOptional) {
      next();
    } else {
      return res.status(401).json("Must log in first");
    }
  } else {
    //valid token
    jwt.verify(bearerToken, process.env.JWT_SECRET_KEY, (err, authData) => {
      if (err) {
        return res.status(403).json(err);
        //this runs if the token has expired, returning err as:
        // {
        //   "name": "TokenExpiredError",
        //   "message": "jwt expired",
        //   "expiredAt": <expiry Date()>
        // }
      }
      req.user = authData.user;
      next();
    });
  }
}

const verifyToken = [checkToken];
const verifyTokenOptional = [tokenIsOptional, checkToken];

module.exports = { verifyToken, verifyTokenOptional };
