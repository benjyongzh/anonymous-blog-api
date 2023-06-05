//jwt verification
const jwt = require("jsonwebtoken");
require("dotenv").config();

function verifyToken(req, res, next) {
  //get auth header value
  const bearerHeader = req.headers["authorization"];
  //format of token:
  // authorization: Bearer <access_token>

  //check if bearer is undefined
  //split at space
  const bearerToken = bearerHeader && bearerHeader.split(" ")[1];
  //forbidden
  if (bearerToken == null) return res.status(401).json("Must log in first");

  //valid token
  jwt.verify(bearerToken, process.env.JWT_SECRET_KEY, (err, authData) => {
    if (err) {
      res.status(403).json(err);
    }
    req.user = authData.user;
    next();
  });
}

module.exports = { verifyToken };
