const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const authenticateToken = require('../middleware/auth');

router.post('/login', adminController.login);
router.post('/register', adminController.register);
// router.post('/delete', adminController.deleteUser);
router.delete('/', authenticateToken, adminController.deleteUser);
module.exports = router;
