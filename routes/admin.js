const path = require('path');
const express = require('express');

const router = express.Router();

const check = 'Hello chibuigwe';

const products = [];

router.get('/add-product', (req, res, next) => {
    res.render('add-product', {pageTitle: 'Add-Product'});
});

router.post('/add-product', (req, res, next) => {
    products.push({title: req.body.title});
    res.redirect('/');
})

module.exports = {router, products};

