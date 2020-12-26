const express = require("express");
const { signup, signin,  } = require("../controllers/user");
const router = express.Router();
const { validatesignupRequest, isRequestValidated, validatesigninRequest } = require("../validators/auth");


router.post("/signup", validatesignupRequest, isRequestValidated ,signup) ;
router.post("/signin", validatesigninRequest, isRequestValidated, signin);


module.exports = router;
