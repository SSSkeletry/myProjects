const Router = require('express');
const router = new Router();
const orderControl = require('../controllers/orderControl');

router.post('/create',orderControl.create)
router.get('/getall',orderControl.getAll)
router.get('/getone',orderControl.getOne)
router.post('/accept',orderControl.accept)
module.exports = router;