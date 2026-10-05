const express = require('express');
const {
  register,
  login,
  getProfile,
} = require('../controllers/authController');
const {
  registerValidator,
  loginValidator,
} = require('../validators/authValidators');
const validate = require('../middleware/validate');
const protect = require('../middleware/auth');

const router = express.Router();

router.post('/register', registerValidator, validate, register);
router.post('/login', loginValidator, validate, login);
router.get('/profile', protect, getProfile);

module.exports = router;
