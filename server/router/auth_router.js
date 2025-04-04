const express = require('express');
const router = express.Router();
const { login, register } = require('../controlers/auth-controler');
const validate = require('../middleware/validate-middleware');
const { loginSchema, registerSchema } = require('../validators/validators');

// RESTful auth endpoints
router.post('/sessions', validate(loginSchema), login); // Login endpoint
router.post('/register', validate(registerSchema), register); // Register endpoint

module.exports = router;