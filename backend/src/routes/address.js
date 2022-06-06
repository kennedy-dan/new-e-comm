const express = require("express");
const { addAddress, getAddress } = require("../controllers/address");
const router = express.Router();
const { requireSignin, userMiddleware } = require("../middleware");


router.post("/user/address/create", requireSignin, userMiddleware, addAddress);
router.post("/user/getaddress", requireSignin, userMiddleware, getAddress);
module.exports = router;
