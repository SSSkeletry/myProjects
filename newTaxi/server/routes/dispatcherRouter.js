const Router = require('express');
const router = new Router();
const DispatcherController = require('../controllers/dispatcherControl')

router.post('/registration', DispatcherController.registration);
router.get('/auth', DispatcherController.check) 

module.exports = router;