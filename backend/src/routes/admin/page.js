const express = require("express");
const { createPage, getPage } = require("../../controllers/admin/page");
const { upload, requireSignin, adminMiddle } = require("../../middleware");
const router = express.Router();

router.post(`/page/create`, requireSignin, adminMiddle, upload.fields([{ name: "banners" }, { name: "products" }]), createPage);
// router.get(`/page/create`, createPage)
router.get('/page/:category/:type', getPage)
module.exports = router;
