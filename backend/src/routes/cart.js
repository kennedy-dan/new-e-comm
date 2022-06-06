const express = require("express");
const { addToCart, getCartItems } = require("../controllers/cart");
const router = express.Router();
const { requireSignin, userMiddleware } = require("../middleware");


router.post("/user/cart/addtoCart", requireSignin, userMiddleware, addToCart);
router.post("/user/getCartItems", requireSignin, userMiddleware, getCartItems);
module.exports = router;
