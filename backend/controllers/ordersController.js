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
const createOrder = async (req, res) => {
    try {
        const { 
            user_id, 
            customer_name, 
            email, 
            phone, 
            address, 
            payment_method, 
            order_notes, 
            items, 
            total_amount 
        } = req.body;

        // Log dữ liệu nhận được
        console.log('Received order data:', {
            user_id, customer_name, email, phone, address, 
            payment_method, order_notes, total_amount,
            items: items?.length
        });

        // Validate dữ liệu
        if (!items || !Array.isArray(items) || items.length === 0) {
            return res.status(400).json({ 
                message: 'Đơn hàng phải có ít nhất một sản phẩm'
            });
        }

        if (!customer_name || !email || !phone || !address || !payment_method) {
            return res.status(400).json({
                message: 'Vui lòng điền đầy đủ thông tin bắt buộc'
            });
        }

        // Thêm đơn hàng vào database
        ordersModel.addOrder({
            user_id, 
            customer_name, 
            email, 
            phone, 
            address, 
            payment_method, 
            order_notes, 
            total_amount
        }, (orderErr, orderId) => {
            if (orderErr) {
                console.error('Lỗi khi tạo đơn hàng:', orderErr);
                return res.status(500).json({
                    message: 'Lỗi khi tạo đơn hàng',
                    error: orderErr.message
                });
            }

            // Thêm chi tiết đơn hàng
            ordersModel.addOrderItems(orderId, items, (itemsErr) => {
                if (itemsErr) {
                    console.error('Lỗi khi thêm chi tiết đơn hàng:', itemsErr);
                    return res.status(500).json({
                        message: 'Lỗi khi thêm chi tiết đơn hàng',
                        error: itemsErr.message
                    });
                }

                // Trả về thông tin đơn hàng đã tạo
                res.status(201).json({
                    id: orderId,
                    message: 'Đơn hàng đã được tạo thành công',
                    user_id,
                    customer_name,
                    email,
                    phone,
                    address,
                    payment_method,
                    order_notes,
                    total_amount,
                    status: 'pending',
                    items: items
                });
            });
        });
    } catch (error) {
        console.error('Lỗi không xác định:', error);
        res.status(500).json({
            message: 'Đã xảy ra lỗi khi xử lý đơn hàng',
            error: error.message
        });
    }
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
