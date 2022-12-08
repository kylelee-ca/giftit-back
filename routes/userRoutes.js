const express = require("express");

const router = express.Router();

const { registerUser, loginUser } = require("../controllers/userControllers");

router.post("/login", loginUser);
router.post("/signup", registerUser);

// router.get("getInfo", getUserInfo);

module.exports = router;
