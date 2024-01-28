const Router = require('express');
const router = new Router();
const userContoller = require('../controllers/userControl')
const authMiddle = require('../middleware/authMiddle')

router.post('/registration',userContoller.registration)
router.post('/login', userContoller.login)
router.get('/auth',authMiddle, userContoller.check)

module.exports = router;