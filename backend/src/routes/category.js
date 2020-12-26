const express = require("express");
const router = express.Router();
const { createCategory, getCategory, updateCategory, deleteCategory } = require("../controllers/category");
const { requireSignin, adminMiddle } = require("../middleware");
const shortid = require('shortid')
const path = require('path')
const multer = require("multer");



const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(path.dirname(__dirname), 'uploads'))
    },
    filename: function (req, file, cb) {
      cb(null,shortid.generate() + '-' + file.originalname)
    }
  })
   
  const upload = multer({storage})


router.post("/category/create", requireSignin, adminMiddle,upload.single('categoryImage'),createCategory);
router.get('/category/getcategory', getCategory)
router.post("/category/update",upload.array('categoryImage'),updateCategory);
router.post("/category/delete",deleteCategory);


module.exports = router;
