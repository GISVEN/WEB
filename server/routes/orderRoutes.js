const Router = require('express')
const router = new Router()
const orderController = require('../controllers/orderController')
const checkRole = require('../middleware/checkRoleMiddleware')
const authMiddleware = require('../middleware/authMiddleware')


router.post('/', authMiddleware, orderController.create)
router.post('/change', checkRole("ADMIN"), orderController.change)
router.get('/', authMiddleware, orderController.getAll)
router.get('/:id', authMiddleware, orderController.getOne)
router.delete('/:id', authMiddleware, orderController.delete)



module.exports = router