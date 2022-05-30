const Router = require('express')
const router = new Router()

const userRouter = require('./userRoutes')
const typeRouter = require('./typeRoutes')
const brandRouter = require('./brandRoutes')
const orderRouter = require('./orderRoutes')
const basketRouter = require('./basketRoutes')
const deviceRouter = require('./deviceRoutes')

router.use('/user', userRouter)
router.use('/type', typeRouter)
router.use('/brand', brandRouter)
router.use('/order', orderRouter)
router.use('/basket', basketRouter)
router.use('/device', deviceRouter)


module.exports = router
