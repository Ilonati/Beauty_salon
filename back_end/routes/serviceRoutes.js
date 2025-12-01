const express = require('express');
const router = express.Router();
const servicesController = require('../controllers/serviceController');
const authenticateToken = require('../middleware/auth');


router.get('/', servicesController.getServices);

router.get('/:id', servicesController.getService);


router.post('/', authenticateToken, servicesController.createService);


router.put('/:id', authenticateToken, servicesController.updateService);


router.delete('/:id', authenticateToken, servicesController.deleteService);

module.exports = router;
