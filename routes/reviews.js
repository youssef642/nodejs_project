const express = require('express');
const router = express.Router();
const controller = require('../controllers/reviewsController');

router.post('/', controller.submitReview);
router.get('/:productId', controller.getProductReviews);

module.exports = router;
