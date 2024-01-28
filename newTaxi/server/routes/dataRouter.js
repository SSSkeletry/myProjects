const Router = require('express');
const router = new Router();
const dataControl = require('../controllers/dataControl');

router.post('/',dataControl.create)
router.get('/',dataControl.getOne)

module.exports = router;