

const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const authenticateToken = require('../middleware/auth');

router.post('/register', adminController.register);
router.post('/login', adminController.login);
router.delete('/delete/:email', adminController.deleteUser);
router.delete('/', authenticateToken, adminController.deleteUser);

module.exports = router;

