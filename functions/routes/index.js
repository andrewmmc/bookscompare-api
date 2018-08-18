const express = require('express');
const booksController = require('../controllers/booksController');

const router = express.Router();

router.route('/isbn/:id').get(booksController.get);

module.exports = router;
