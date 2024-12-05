const express = require('express');
const { getOrders, getOrderById, createOrder, updateOrderStatus, deleteOrder } = require('../controllers/ordersController');

const router = express.Router();

router.get('/', getOrders);
router.get('/:id', getOrderById);
router.post('/', createOrder);
router.put('/:id', updateOrderStatus);
router.delete('/:id', deleteOrder);

module.exports = router;
