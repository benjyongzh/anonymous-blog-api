const User = require("../models/user");

const { body } = require("express-validator");

//membership passcodes
require("dotenv").config();

async function getCurrentMembership(req, res, next) {
  const userToLookAt = await User.findById(req.params.id);
  req.body.current_membership = userToLookAt.member_status;
  next();
}

const passcodeSanitize = [
  //validation and sanitization of fields
  body("member_password").trim(),
];

const checkUpgradeApplicability = [
  //check to make sure expiry date is after manufacture date
  body("member_password").custom((input, { req }) => {
    const currentMembership = req.body.current_membership;
    if (input === process.env.PREMIUM_PASSCODE) {
      if (currentMembership === "Basic") {
        req.body.new_membership = "Premium";
        return true;
      } else throw new Error("Passcode not applicable");
    } else if (input === process.env.ADMIN_PASSCODE) {
      if (currentMembership === "Basic" || currentMembership === "Premium") {
        req.body.new_membership = "Admin";
        return true;
      } else throw new Error("Passcode not applicable");
    } else {
      throw new Error("Invalid passcode");
    }
  }),
];

const passcodeCheck = [
  getCurrentMembership,
  passcodeSanitize,
  checkUpgradeApplicability,
];

module.exports = { passcodeCheck };
