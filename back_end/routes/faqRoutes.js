const express = require('express');
const router = express.Router();
const faqController = require('../controllers/faqController');
const authenticateToken = require('../middleware/auth');

// Public
router.get('/', faqController.getFaqs);
router.get('/:id', faqController.getFaq);

// Admin only
router.post('/', authenticateToken, faqController.createFaq);
router.put('/:id', authenticateToken, faqController.updateFaq);
router.delete('/:id', authenticateToken, faqController.deleteFaq);

module.exports = router;
