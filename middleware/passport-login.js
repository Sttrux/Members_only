const passport = require("../auth/passport");

const passport_login = passport.authenticate("local", {
    successRedirect:"/",
    failureRedirect:"/"
})
module.exports = passport_login;