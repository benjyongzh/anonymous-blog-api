const User = require("../models/user");

async function memberUserValidation(req, res, next) {
  const userToLookAt = await User.findById(req.params.id).exec();
  //check for errors
  if (userToLookAt === null) {
    // no such user
    return res.status(404).json({
      user: req.user,
      error: "User could not be found",
    });
  }

  //check for errors
  if (userToLookAt._id.toString() !== req.user._id.toString()) {
    // authorized user and userToLookAt are not the same accounts
    return res.status(403).json({
      user: req.user,
      error: "Page is forbidden to user",
    });
  }

  next();
}

module.exports = { memberUserValidation };
