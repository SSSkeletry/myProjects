const Router = require('express');
const router = new Router();
const orderControl = require('../controllers/orderControl');

router.post('/create',orderControl.create)
router.get('/getall',orderControl.getAll)
router.get('/dispatcherOrders',orderControl.getDispatcherOrders)
router.get('/driverOrders', orderControl.getDriverOrders);
router.post('/accept',orderControl.accept)
router.post('/assignDriver', orderControl.assignDriver);
router.post('/completeOrder', orderControl.completeOrder);
router.post('/completeOrderWithRating', orderControl.completeOrderWithRating);
module.exports = router;    