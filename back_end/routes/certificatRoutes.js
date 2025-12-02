const express = require('express');
const router = express.Router();
const certificatController = require('../controllers/certificatController');
const authenticateToken = require('../middleware/auth');
const multer = require('multer');

//  configuration Multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    }
});
const upload = multer({ storage });

router.get('/', certificatController.getCertificats);

router.post('/', authenticateToken, upload.single('fichier'), certificatController.createCertificat);

router.delete('/:id', authenticateToken, certificatController.deleteCertificat);

module.exports = router;
