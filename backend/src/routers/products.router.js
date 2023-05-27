const express = require('express');
const { productsController } = require('../controllers');
const { validateNewProduct } = require('../middlewares/validateProducts');

const router = express.Router();

router.get('/', productsController.getAllProducts);
router.get('/:id', productsController.findProductById);
router.post('/', validateNewProduct, productsController.createProduct);

module.exports = router;