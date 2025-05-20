

const express = require('express');
const router = express.Router();
const controller = require('../controllers/ordersController');

// GET /orders/:userId => get order history for user
router.get('/:userId', controller.getOrderHistory);

module.exports = router;
