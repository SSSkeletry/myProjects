const Router = require('express');
const router = new Router();


const userRouter = require('./userRouter')
const driverRouter = require('./driverRouter')
const dispatcherRouter = require('./dispatcherRouter')
const carRouter = require('./carRouter')
const orderRouter = require('./orderRouter')

router.use('/user', userRouter)
router.use('/driver', driverRouter)
router.use('/dispatcher', dispatcherRouter)
router.use('/car', carRouter)
router.use('/order', orderRouter)

module.exports = router;