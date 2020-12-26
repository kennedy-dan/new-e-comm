const express = require("express");
const { signup, signin, signout,  } = require("../../controllers/admin/user");
const { requireSignin } = require("../../middleware");
const { validatesignupRequest, isRequestValidated, validatesigninRequest } = require("../../validators/auth");
const router = express.Router();


router.post("/admin/signup", validatesignupRequest, isRequestValidated, signup) ;
router.post("/admin/signin", validatesigninRequest, isRequestValidated ,signin);

router.post("/admin/signout", signout);



module.exports = router;
