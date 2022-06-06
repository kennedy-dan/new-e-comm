const express = require("express");
const { addOrder, getOrders } = require("../controllers/order");
const router = express.Router();
const { requireSignin, userMiddleware } = require("../middleware");


router.post("/addOrder", requireSignin, userMiddleware, addOrder);
router.get("/getOrders", requireSignin, userMiddleware, getOrders);
module.exports = router;
