const express = require("express");
const { registerUser, loginUser, currentUserInfo } = require("../controllers/user.controller.js");
const validateToken = require("../middlewares/validatetokenhandler.middleware.js");

const router = express.Router();

router.post("/register", registerUser);

router.post("/login", loginUser);

router.get("/current",validateToken, currentUserInfo);

module.exports = router;