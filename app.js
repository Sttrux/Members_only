require("dotenv").config();
const express = require("express");
const app = express();
const index_route = require("./routes/index.route");
const path = require("path");
const passport = require("./auth/passport");
const session = require("express-session");

//View Engine
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

//Public Assets
const staticAssets = path.join(__dirname, "public");
app.use(express.static(staticAssets));
//POST DECODER

app.use(express.urlencoded({ extended: true }));


//Session
app.use(
  session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false,
  }),
);
//Passport
app.use(passport.initialize());
app.use(passport.session());

//Index route
app.use("/", index_route);

//Listening PORT
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`App running on PORT ${PORT}`);
});
