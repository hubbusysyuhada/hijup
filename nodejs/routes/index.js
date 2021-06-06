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

// order routes
router.get('/order', MainController.getAllOrders)
router.post('/order', MainController.createOrder)
// routes untuk menghapus/mengurangi 1 barang defined by product id
router.delete('/order/:id', MainController.minusOne)
// routes untuk menghapus semua barang defined by id
router.delete('/order/clear/:id', MainController.toZeroQuantity)
// routes untuk menghapus semua order item
router.delete('/order', MainController.emptyOrderList)

// BIKIN API DOC DI README

router.use(errorHandler)

module.exports = {
    router
}