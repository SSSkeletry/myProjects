const Router = require('express');
const router = new Router();
const DriverController = require('../controllers/driverControl')

router.post('/login',DriverController.login)
router.get('/auth',DriverController.check)

module.exports = router;