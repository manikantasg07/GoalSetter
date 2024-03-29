const express = require("express");
const router = express.Router();

const {registerUser, loginUser,getMe,changePassword} = require("../Controllers/userController");
const {protect} = require("../Middleware/authMiddleware");

router.post("/",registerUser);

router.post("/login",loginUser);

router.post("/changePassword",changePassword);

router.get("/me",protect,getMe);






module.exports = router;
