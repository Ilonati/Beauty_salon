const express = require('express');
const router = express.Router();
const certificatController = require('../controllers/certificatController');
const authenticateToken = require('../middleware/auth');
const upload = require('../middleware/upload');

// Public
router.get('/', certificatController.getCertificats);
router.get('/:id', certificatController.getCertificat);

// Admin only
router.post('/', authenticateToken, upload.single("fichier"), certificatController.createCertificat);

router.delete('/:id', authenticateToken, certificatController.deleteCertificat);

module.exports = router;
