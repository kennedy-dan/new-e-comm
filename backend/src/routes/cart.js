const express = require("express");
const { addToCart } = require("../controllers/cart");
const router = express.Router();
const { requireSignin, userMiddleware } = require("../middleware");


router.post("/user/cart/addtoCart", requireSignin, userMiddleware, addToCart);
module.exports = router;
