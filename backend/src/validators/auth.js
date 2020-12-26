const { check, validationResult } = require('express-validator');


exports.validatesignupRequest = [
    check('firstName')
    .notEmpty()
    .withMessage('Firstname is required'),
    check('lastName')
    .notEmpty()
    .withMessage('lastname is required'),
    check('email')
    .isEmail()
    .withMessage('valid email is required'),
    check('password')
    .isLength({ min:6 })
    .withMessage('Password must be up to 6')
]

exports.validatesigninRequest = [
    check('email')
    .isEmail()
    .withMessage('valid email is required'),
    check('password')
    .isLength({ min:6 })
    .withMessage('Password must be up to 6')
]

exports.isRequestValidated = (req, res, next) => {
  const errors = validationResult(req)
    if(errors.array().length > 0){
        return res.status(400).json({errors: errors.array()[0].msg})
    }
    next()
}