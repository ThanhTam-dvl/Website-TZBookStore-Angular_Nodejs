const db = require('../config/db');

// Thêm đơn hàng
const addOrder = (order, callback) => {
    const { user_id, customer_name, email, phone, address, payment_method, order_notes, total_amount } = order;

    const sql = `
        INSERT INTO orders (user_id, customer_name, email, phone, address, payment_method, order_notes, total_amount)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `;

    db.query(sql, [user_id, customer_name, email, phone, address, payment_method, order_notes, total_amount], (err, result) => {
        if (err) callback(err, null);
        else callback(null, result.insertId); // Trả về ID của đơn hàng vừa tạo
    });
};

// Thêm sản phẩm vào đơn hàng
const addOrderItems = (orderId, items, callback) => {
    const values = items.map(item => [orderId, item.book_id, item.quantity, item.price]);

    const sql = `
        INSERT INTO order_items (order_id, book_id, quantity, price)
        VALUES ?
    `;

    db.query(sql, [values], (err, result) => {
        if (err) callback(err, null);
        else callback(null, result);
    });
};

module.exports = {
    addOrder,
    addOrderItems,
};
