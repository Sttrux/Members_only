const userModel = require("../models/user");
const passport = require("../auth/passport");
const postsModel = require("../models/posts");
const bcrypt = require("bcryptjs");

module.exports.index = async (req, res) => {
  let posts;

  if (req.isAuthenticated()) {
    posts = await postsModel.postsWithAutor();
  } else {
    posts = await postsModel.postsWithoutAutor();
  }
  console.log(posts);
  res.render("index", {
    user: req.user,
    posts: posts,
  });
};
module.exports.sign_up = (req, res) => {
  res.render("sign-up", {
    success: null,
    errors: []
  });
};
module.exports.login = (req, res) => {
  res.render("login");
};
module.exports.createUser = async (req, res) => {
  const { username, email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password,10);
  await userModel.registerUser(username, email, hashedPassword);
  res.render("sign-up", {
    success: "User created :DDD",
  });
};
module.exports.logout = (req, res) => {
  req.logout((err) => {
    if (err) {
      return res.status(403).send("Error loging out");
    }
    res.redirect("/");
  });
};
module.exports.newPost = (req,res)=>{
  res.render("newPost", {user:req.user});
}
module.exports.createPost = async (req, res) => {

  const { title, text } = req.body;

  const userId = req.user.id;

  await postsModel.addNewPost(title, text, userId);

  res.redirect("/");
};