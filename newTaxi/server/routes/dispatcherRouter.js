const Router = require('express');
const router = new Router();
const DispatcherController = require('../controllers/dispatcherControl')

router.post('/login', DispatcherController.login)
router.get('/auth', DispatcherController.check) 

module.exports = router;