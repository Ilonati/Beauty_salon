const express = require('express');
const router = express.Router();
const typeServiceController = require('../controllers/typeServiceController');
const authenticateToken = require('../middleware/auth'); // если нужен JWT

// Получить все типы
router.get('/', typeServiceController.getTypes);

// Получить один тип по id
router.get('/:id', typeServiceController.getTypeById);

// Добавить новый тип
router.post('/', authenticateToken, typeServiceController.createType);

// Обновить тип
router.put('/:id', authenticateToken, typeServiceController.updateType);

// Удалить тип
router.delete('/:id', authenticateToken, typeServiceController.deleteType);

module.exports = router;
