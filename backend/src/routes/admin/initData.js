const express = require("express");
const { initData } = require("../../controllers/admin/initData");
const { requireSignin, adminMiddle } = require("../../middleware");
const router = express.Router();


router.post("/initialdata" , requireSignin, adminMiddle, initData) ;




module.exports = router;
