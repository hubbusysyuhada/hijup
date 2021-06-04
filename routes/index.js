const router = require('express').Router()
const MainController = require('../controllers/MainController')
const errorHandler = require('../middlewares/errorHandler')


router.get('/', (req, res, next) => {
    res.status(200).json("Welcome to Hijup")
})

// products routes
router.get('/products', MainController.getAllProducts)
router.get('/product/:id', MainController.getProduct)
router.post('/product', MainController.addProduct)
router.put('/product/:id', MainController.editProduct)
router.delete('/product/:id', MainController.deleteProduct)

// order router
router.get('/order', MainController.getAllOrders)
router.post('/order', MainController.newBulkOrder)


router.use(errorHandler)

module.exports = {
    router
}