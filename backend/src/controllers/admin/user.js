const User = require("../../model/user");
const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt')
const shortid = require('shortid')
exports.signup = (req, res) => {
  User.findOne({ email: req.body.email }).exec(async(err, user) => {
    if (user) return res.status(400).json({ msg: "admin already exist" });

    const { firstName, lastName, email, password } = req.body;
    const hash_password = await bcrypt.hash(password, 10)
    const _user = new User({
      firstName,
      lastName,
      email,
      hash_password,
      username: shortid.generate(),
      role: 'admin'
    });

    _user.save((err, data) => {
      if (err) return res.status(400).json({ msg: "something went wrong" });
      if (data) return res.status(201).json({ user: 'admin created successfully' });
    });
  });
};

exports.signin = (req, res) => {
  User.findOne({ email: req.body.email }).exec((err, user) => {
    if (err) return res.status(400).json({ err });
    if (user) {
      if (user.authenticate(req.body.password) && user.role === 'admin') {
        const token = jwt.sign({ _id: user._id, role: user.role }, process.env.JWT, {
          expiresIn: "1d",
        });
        const { _id, firstName, lastName, email, role, fullName } = user;
        res.cookie('token',token,{expiresIn: '1d'})
        res.status(200).json({
          token,
          user: { _id, firstName, lastName, email, role, fullName },
        });
      } else {
        return res.status(400).json({ msg: "invalid password" });
      }
    } else {
      return res.status(400).json({ msg: "something went wrong" });
    }
  });
};

exports.signout = (req, res) => {
  res.clearCookie('token')
  res.status(200).json({
    msg: 'signout successful'
  })
}
