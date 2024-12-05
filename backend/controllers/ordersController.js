const db = require('../config/db');
const ordersModel = require('../models/ordersModel');

// Lấy danh sách đơn hàng
const getOrders = (req, res) => {
    const query = 'SELECT * FROM orders';
    db.query(query, (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
};

// Lấy thông tin đơn hàng theo ID
const getOrderById = (req, res) => {
    const query = 'SELECT * FROM orders WHERE order_id = ?';
    db.query(query, [req.params.id], (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        if (results.length === 0) return res.status(404).json({ message: 'Order not found' });
        res.json(results[0]);
    });
};

// Tạo mới đơn hàng
const createOrder = (req, res) => {
    const { user_id, customer_name, email, phone, address, payment_method, order_notes, items, total_amount } = req.body;

    // Thêm đơn hàng vào database
    ordersModel.addOrder({ user_id, customer_name, email, phone, address, payment_method, order_notes, total_amount }, (err, orderId) => {
        if (err) return res.status(500).json({ error: err.message });

        // Thêm sản phẩm vào đơn hàng
        ordersModel.addOrderItems(orderId, items, (err) => {
            if (err) return res.status(500).json({ error: err.message });

            res.status(201).json({ message: 'Order created successfully', orderId });
        });
    });
};

// Cập nhật trạng thái đơn hàng
const updateOrderStatus = (req, res) => {
    const { status } = req.body;
    const query = 'UPDATE orders SET status = ? WHERE order_id = ?';
    db.query(query, [status, req.params.id], (err) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: 'Order status updated' });
    });
};

// Xóa đơn hàng
const deleteOrder = (req, res) => {
    const query = 'DELETE FROM orders WHERE order_id = ?';
    db.query(query, [req.params.id], (err) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: 'Order deleted' });
    });
};

module.exports = { getOrders, getOrderById, createOrder, updateOrderStatus, deleteOrder };
