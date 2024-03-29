const express = require("express");
const router = express.Router();
const {emailToVerify,verifyOtp} = require("../Controllers/forgotPassword");

router.route("/").post(emailToVerify);
router.route("/verifyOtp").post(verifyOtp);

module.exports = router;