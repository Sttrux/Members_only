const express = require("express");
const router = express.Router();
const controller = require("../controllers/index.controller");
const checkValidation = require("../auth/validation");
const userValidator = require("../middleware/userValidator");
const passport_login = require("../middleware/passport-login");

router.get("/",controller.index);
router.get("/sign-up",controller.sign_up);
router.get("/login", controller.login)
router.get("/logout", controller.logout);
router.get("/new-post", controller.newPost);

router.post("/sign-up",userValidator,checkValidation, controller.createUser);
router.post("/login", passport_login);
router.post("/new-post",controller.createPost);
module.exports = router;