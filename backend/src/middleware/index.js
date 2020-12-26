const jwt = require("jsonwebtoken");

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
   
  exports.upload = multer({storage})

exports.requireSignin = (req, res, next) => {
  if (req.headers.authorization) {
    const token = req.headers.authorization.split(" ")[1];
    const user = jwt.verify(token, process.env.JWT);
    req.user = user;
  } else {
    res.status(400).json({ msg: "not authorized" });
  }

  next();
};

exports.userMiddleware = (req, res, next) => {
  if (req.user.role != "user") {
    return res.status(400).json({ msg: "must be a user" });
  }
  next()
};

exports.adminMiddle = (req, res, next) => {
  if (req.user.role != "admin") {
    return res.status(400).json({ msg: "must be an admin" });
  }
  next();
};
