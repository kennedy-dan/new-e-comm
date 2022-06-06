const express = require("express");
const router = express.Router();
const { createProduct, getProductSlug, getProductDetailsId } = require("../controllers/product");
// const { createCategory, getCategory } = require("../controllers/category");
const { requireSignin, adminMiddle } = require("../middleware");
const Product = require('../model/product')
const shortid = require('shortid')
const multer = require("multer");
const path = require('path')



const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(path.dirname(__dirname), 'uploads'))
    },
    filename: function (req, file, cb) {
      cb(null,shortid.generate() + '-' + file.originalname)
    }
  })
   
  const upload = multer({storage})


router.post("/product/create", requireSignin, adminMiddle, upload.array('productPictures'),createProduct);
router.get('/products/:slug',getProductSlug)
router.get('/product/:productId', getProductDetailsId)
module.exports = router;
