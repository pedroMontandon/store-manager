const express = require('express');
const { salesController } = require('../controllers');
const { validateNewSale, validateSaleUpdate } = require('../middlewares/validateSales');

const router = express.Router();

router.get('/', salesController.getAllSales);
router.get('/:id', salesController.findSaleById);
router.post('/', validateNewSale, salesController.createSale);
router.delete('/:id', salesController.deleteSale);
router.put('/:saleId/products/:productId/quantity', validateSaleUpdate, salesController.updateSale);

module.exports = router;