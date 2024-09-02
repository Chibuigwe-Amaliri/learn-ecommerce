const path = require('path');
const express = require('express');
const shopController = require('../controller/shop');

const router = express.Router();

// include your admin routers
 router.get('/', shopController.getIndex);

 router.get('/products', shopController.getProducts);

 router.get('/products/:productId', shopController.getProduct);

 router.post('/cart', shopController.postCart);

 router.get('/cart', shopController.getCart);

 router.post('/cart-delete-item', shopController.postCartDeleteProduct);

 router.post('/create-order', shopController.postOrder);

 router.get('/orders', shopController.getOrders);

module.exports = router;