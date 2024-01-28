const Router = require('express');
const router = new Router();
const orderControl = require('../controllers/orderControl');

router.post('/',orderControl.create)
router.get('/',orderControl.getAll)
router.get('/',orderControl.getOne)
module.exports = router;