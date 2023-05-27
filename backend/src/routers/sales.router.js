const express = require('express');
const { salesController } = require('../controllers');
const { validateNewSale } = require('../middlewares/validateSales');

const router = express.Router();

router.get('/', salesController.getAllSales);
router.get('/:id', salesController.findSaleById);
router.post('/', validateNewSale, salesController.createSale);

module.exports = router;