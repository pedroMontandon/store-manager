const express = require('express');
const { salesController } = require('../controllers');

const router = express.Router();

router.get('/', salesController.getAllSales);
router.get('/:id', salesController.findSaleById);
router.post('/', salesController.createSale);

module.exports = router;