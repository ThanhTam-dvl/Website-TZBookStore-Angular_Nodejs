const db = require('../config/db');
const booksModel = require('../models/booksModel');

// Lấy danh sách sách
const getBooks = (req, res) => {
    const query = 'SELECT * FROM books';
    db.query(query, (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(results);
    });
};

// Lấy thông tin sách theo ID
const getBookById = (req, res) => {
    const query = 'SELECT * FROM books WHERE book_id = ?';
    db.query(query, [req.params.id], (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (results.length === 0) {
            return res.status(404).json({ message: 'Book not found' });
        }
        res.json(results[0]);
    });
};

// Thêm sách mới
const createBook = (req, res) => {
    const { title, category_id, author, price, stock_quantity, description } = req.body;
    const query = 'INSERT INTO books (title, category_id, author, price, stock_quantity, description) VALUES (?, ?, ?, ?, ?, ?)';
    db.query(query, [title, category_id, author, price, stock_quantity, description], (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(201).json({ message: 'Book created', bookId: results.insertId });
    });
};

// Cập nhật sách
const updateBook = (req, res) => {
    const { title, category_id, author, price, stock_quantity, description } = req.body;
    const query = 'UPDATE books SET title = ?, category_id = ?, author = ?, price = ?, stock_quantity = ?, description = ? WHERE book_id = ?';
    db.query(query, [title, category_id, author, price, stock_quantity, description, req.params.id], (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json({ message: 'Book updated' });
    });
};

// Xóa sách
const deleteBook = (req, res) => {
    const query = 'DELETE FROM books WHERE book_id = ?';
    db.query(query, [req.params.id], (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json({ message: 'Book deleted' });
    });
};

// Lấy danh sách sách theo loại
const getBooksByCategory = (req, res) => {
    const categoryId = req.params.categoryId;
    booksModel.getBooksByCategory(categoryId, (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(results);
    });
};

// Lấy 6 sản phẩm sách có số lượng ít nhất
const getLowStockBooks = (req, res) => {
    const query = `
      SELECT book_id, title, description, price, stock_quantity, image_url
      FROM books
      ORDER BY stock_quantity ASC
      LIMIT 6
    `;

    db.query(query, (err, results) => {
        if (err) {
            console.error("Query error:", err); // Log lỗi truy vấn
            return res.status(500).json({ error: err.message });
        }
        console.log("Query results:", results); // Log kết quả trả về
        if (results.length === 0) {
            return res.status(404).json({ message: "Book not found" });
        }
        res.json(results);
    });
};


module.exports = { getBooks, getBookById, createBook, updateBook, deleteBook, getBooksByCategory, getLowStockBooks };


