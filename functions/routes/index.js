const express = require('express');
const authController = require('../controllers/authController');
const booksController = require('../controllers/booksController');

const router = express.Router();

// old api
router.route('/isbn/:id').get(booksController.get);

// authentication
router.route('/auth/register').post(authController.postRegister);
router.route('/auth/signin').post(authController.postSignin);

module.exports = router;
