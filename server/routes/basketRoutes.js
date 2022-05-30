const Router = require('express')
const router = new Router()
const basketController = require('../controllers/basketController')
const checkRole = require('../middleware/checkRoleMiddleware')
const authMiddleware = require('../middleware/authMiddleware')

router.post('/', authMiddleware, basketController.create)
router.post('/add', authMiddleware, basketController.addDevice)
router.post('/update', authMiddleware, basketController.updateBasketDeviceCount)
router.get('/:id', authMiddleware, basketController.getBasket)
router.get('/devices/:id', authMiddleware, basketController.getDevices)
router.delete('/', checkRole('ADMIN'), basketController.delete)


module.exports = router