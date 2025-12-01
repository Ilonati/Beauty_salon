const express = require('express');
const router = express.Router();
const typeServiceController = require('../controllers/typeServiceController');
const authenticateToken = require('../middleware/auth');


router.get('/', typeServiceController.getTypes);


router.get('/:id', typeServiceController.getTypeById);


router.post('/', authenticateToken, typeServiceController.createType);


router.put('/:id', authenticateToken, typeServiceController.updateType);


router.delete('/:id', authenticateToken, typeServiceController.deleteType);

module.exports = router;
