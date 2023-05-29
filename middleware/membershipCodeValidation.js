const { body, oneOf } = require("express-validator");

//membership passcodes
require("dotenv").config();
const premiumCode = process.env.PREMIUM_PASSCODE;
const adminCode = process.env.ADMIN_PASSCODE;

const memberPasscodeValidation = [
  //validation and sanitization of fields
  body("member_password").trim(),
  oneOf(
    [
      body("member_password").equals(premiumCode),
      body("member_password").equals(adminCode),
    ],
    {
      message: "Passcode is invalid",
    }
  ),
];

module.exports = { memberPasscodeValidation };
