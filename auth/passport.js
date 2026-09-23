const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const userModel = require("../models/user");
const bcrypt = require("bcryptjs");

passport.use(
  new LocalStrategy(async (username, password, done) => {
    try {
      const user = await userModel.findUsername(username);
      if(!user){
        return done(null,false, {message:"Incorrect username"});
      }
      const verifyPassword = await bcrypt.compare(password, user.password)
      if (verifyPassword == false) {
        return done(null,false,{message:"Incorrect password"})
      }
      return done(null,user);
    } catch (err) {
      return done(err);
    }
  }),
);
passport.serializeUser((user,done)=>{
    done(null,user.id);
})
passport.deserializeUser(async(id,done)=>{
    try{
        const user = await userModel.findByID(id);
        return done(null, user);
    }catch(err){
        return done(err);
    }
})
module.exports = passport;