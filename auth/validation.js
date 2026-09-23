const { validationResult } = require("express-validator");

const checkValidation = (req, res, next) => {
  const errors = validationResult(req);

  console.log("ERRORES:", errors.array());

  if (!errors.isEmpty()) {
    return res.render("sign-up", {
      errors: errors.array(),
      sucess:null
    });
  }

  next();
};

module.exports = checkValidation;