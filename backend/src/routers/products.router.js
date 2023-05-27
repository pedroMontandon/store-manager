const express = require('express');
const { productsController } = require('../controllers');
const { validateNewProduct } = require('../middlewares/validateProducts');

const router = express.Router();

router.get('/', productsController.getAllProducts);
router.get('/:id', productsController.findProductById);
router.post('/', validateNewProduct, productsController.createProduct);
router.put('/:id', validateNewProduct, productsController.updateProduct);

module.exports = router;