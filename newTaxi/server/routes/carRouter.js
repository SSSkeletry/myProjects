const Router = require('express');
const router = new Router();
const carControl = require('../controllers/carControl');
const checkRole = require("../middleware/checkRoleMiddle")

router.post('/',checkRole('DRIVER'),carControl.create)
router.get('/:id',carControl.getOne)

module.exports = router;