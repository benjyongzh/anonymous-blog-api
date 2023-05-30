const { body } = require("express-validator");

const passwordSanitize = [
  //validation and sanitization of fields
  body("password")
    .exists()
    .withMessage("Password must not be empty")
    .trim()
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters long"),
];

const confirmPasswordSanitize = [
  //validation and sanitization of fields
  body("confirmpassword")
    .exists()
    .withMessage("Password confirmation must not be empty")
    .trim()
    .custom((confirmPassword, { req }) => {
      const firstPassword = req.body.password;
      if (firstPassword === confirmPassword) {
        return true;
      } else {
        throw new Error(
          "Password confirmation must be identical to password input"
        );
      }
    }),
];

const passwordCheck = [passwordSanitize, confirmPasswordSanitize];

module.exports = { passwordCheck };
