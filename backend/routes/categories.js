const express = require('express');
const router = express.Router();
const categoriesController = require('../controllers/categoriesController');

// API để lấy danh sách loại sách
router.get('/', categoriesController.getCategories);

module.exports = router;
