const express = require("express");
const { updateOrder } = require("../../controllers/admin/order");
const { requireSignin, adminMiddle } = require("../../middleware");
const router = express.Router();


router.post("/order/update" , requireSignin, adminMiddle, updateOrder) ;




module.exports = router;
