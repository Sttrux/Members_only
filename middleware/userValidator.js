const { body } = require("express-validator");
const userModel = require("../models/user");

const register_validator = [
  body("username")
    .trim()
    .notEmpty()
    .withMessage("Username is required")
    .custom(async (value) => {
      const user = await userModel.findByUsername(value);

      if (user) {
        throw new Error("Username already registered");
      }

      return true;
    }),

  body("email")
    .trim()
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Enter a valid email")
    .custom(async (value) => {
      const user = await userModel.findByEmail(value);

      if (user) {
        throw new Error("Email already registered");
      }

      return true;
    }),

  body("password")
    .notEmpty()
    .withMessage("Password is required"),

  body("confirm-password")
    .notEmpty()
    .withMessage("Please confirm your password")
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error("Password doesn't match :(");
      }

      return true;
    }),
];

module.exports = register_validator;