const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const db = require('../config/db');
const { authenticateToken, isAdmin } = require('../middleware/auth');

// Route đăng nhập
router.post('/login', (req, res) => {
  const { email, password } = req.body;
  
  const query = 'SELECT * FROM users WHERE email = ? AND password = ?';
  db.query(query, [email, password], (err, results) => {
    if (err) {
      console.error('Database error:', err);
      return res.status(500).json({ message: 'Lỗi server' });
    }

    if (results.length > 0) {
      const user = results[0];
      const token = jwt.sign(
        { 
          userId: user.user_id,
          role: user.role,
          email: user.email 
        },
        process.env.JWT_SECRET || 'your-secret-key',
        { expiresIn: '24h' }
      );

      res.json({
        token,
        user: {
          userId: user.user_id,
          email: user.email,
          role: user.role,
          fullName: user.full_name
        }
      });
    } else {
      res.status(401).json({ message: 'Email hoặc mật khẩu không đúng' });
    }
  });
});

// Route đăng ký
router.post('/register', (req, res) => {
  const { username, email, password, full_name, role = 'customer' } = req.body;

  // Kiểm tra email đã tồn tại chưa
  const checkEmailQuery = 'SELECT * FROM users WHERE email = ?';
  db.query(checkEmailQuery, [email], (err, results) => {
    if (err) {
      console.error('Database error:', err);
      return res.status(500).json({ message: 'Lỗi server' });
    }

    if (results.length > 0) {
      return res.status(400).json({ message: 'Email đã được sử dụng' });
    }

    // Thêm user mới
    const insertQuery = `
      INSERT INTO users (username, email, password, full_name, role) 
      VALUES (?, ?, ?, ?, ?)
    `;
    
    db.query(insertQuery, [username, email, password, full_name, role], (err, result) => {
      if (err) {
        console.error('Database error:', err);
        return res.status(500).json({ message: 'Lỗi khi tạo tài khoản' });
      }

      res.status(201).json({
        message: 'Đăng ký thành công',
        userId: result.insertId
      });
    });
  });
});

// Route lấy thông tin user (yêu cầu xác thực)
router.get('/profile', authenticateToken, (req, res) => {
  const query = 'SELECT user_id, username, email, full_name, role FROM users WHERE user_id = ?';
  db.query(query, [req.user.userId], (err, results) => {
    if (err) {
      console.error('Database error:', err);
      return res.status(500).json({ message: 'Lỗi server' });
    }
    if (results.length === 0) {
      return res.status(404).json({ message: 'Không tìm thấy user' });
    }
    res.json(results[0]);
  });
});

// Route cập nhật thông tin user (yêu cầu xác thực)
router.put('/update-profile', authenticateToken, (req, res) => {
  const { fullName, phone, address } = req.body;
  const query = 'UPDATE users SET full_name = ?, phone = ?, address = ? WHERE user_id = ?';
  
  db.query(query, [fullName, phone, address, req.user.userId], (err) => {
    if (err) {
      console.error('Database error:', err);
      return res.status(500).json({ message: 'Lỗi khi cập nhật thông tin' });
    }
    res.json({ message: 'Cập nhật thành công' });
  });
});

module.exports = router;
