const path = require('path');

const express = require('express');

const adminController = require('../controller/admin');

const router = express.Router();

// include your admin routers
 router.get('/add-product', adminController.getAddProduct);

 router.get('/products', adminController.getProducts);

 router.post('/add-product', adminController.postProduct);

 router.get('/edit-product/:productId', adminController.getEditProduct);

 router.post('/edit-product', adminController.postEditProduct);

 router.post('/delete-product', adminController.postDeleteProduct);

module.exports = router;