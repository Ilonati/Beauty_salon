const express = require('express');
const router = express.Router();
const servicesController = require('../controllers/serviceController'); // твой контроллер
const authenticateToken = require('../middleware/auth'); // можно оставить, если хочешь защищать маршруты токеном

// Получить все сервисы
router.get('/', servicesController.getServices);

// Получить один сервис по id
router.get('/:id', servicesController.getServices);

// Добавить сервис (с защитой JWT, если нужно)
router.post('/', authenticateToken, servicesController.createService);

// Обновить сервис (с защитой JWT, если нужно)
router.put('/:id', authenticateToken, servicesController.updateService);

// Удалить сервис (с защитой JWT, если нужно)
router.delete('/:id', authenticateToken, servicesController.deleteService);

module.exports = router;
