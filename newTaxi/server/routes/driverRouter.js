const Router = require('express');
const router = new Router();
const DriverController = require('../controllers/driverControl');

router.post('/registration', DriverController.registration); // Регистрация
router.get('/auth', DriverController.check);
router.get('/getall', DriverController.getAll);
module.exports = router;