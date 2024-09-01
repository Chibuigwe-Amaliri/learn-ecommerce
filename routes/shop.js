const path = require('path');

const express = require('express');

const router = express.Router();

const adminRouter = require('./admin');;

router.get('/', (req, res, next) => {
    const products = adminRouter.products;
    res.render('shop', {prods: products});
});

module.exports = router;



