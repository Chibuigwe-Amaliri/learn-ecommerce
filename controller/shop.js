const Product = require('../model/product');
const Order = require('../model/order');
//const User = require('../model/user');

exports.getIndex = (req, res, next) => {
    Product.find()
      .then(products => {
        res.render('shop/index', {
          prods: products,
          pageTitle: 'Shop',
          path: '/',
          isAuthenticated: req.session.isLoggedIn
        });
      })
      .catch(err => {
        console.log(err);
      });
  };

exports.getProducts = (req, res, next) => {
    Product.find()
      .then(products => {
        res.render('shop/product-list', {
          prods: products,
          pageTitle: 'All Products',
          path: '/products',
          isAuthenticated: req.session.isLoggedIn
        });
      })
      .catch(err => {
        console.log(err);
      });
  };

  exports.getProduct = (req, res, next) => {
    const prodId = req.params.productId;
    Product.findById(prodId)
      .then(product => {
        res.render('shop/product-detail', {
          product: product,
          pageTitle: 'Product',
          path: '/product-details',
          isAuthenticated: req.session.isLoggedIn
        });
      })
      .catch(err => {
        console.log(err);
      });
  };

  exports.postCart = (req, res, net) => {
    const prodId = req.body.productId;
    Product.findById(prodId)
    .then(product => {
      return req.session.user.addToCart(product);
    })
    .then(result => {
      console.log(result);
      res.redirect('/cart')
    })
    .catch(err => {
      console.log(err)
    })
  }

  exports.getCart = (req, res,next) => {
    req.session.user
    .populate('cart.items.productId')
    .then(user => {
      console.log(user.cart.items);
      const products = user.cart.items;
      res.render('shop/cart', {
          path: '/cart',
          pageTitle: 'Your Cart',
          products: products,
          isAuthenticated: req.session.isLoggedIn
      })
    })
    .catch(err => {
      console.log(err);
    });
  }

  exports.postCartDeleteProduct = (req, res, next) => {
    const prodId = req.body.productId;
    req.session.user
    .removeFromCart(prodId)
    .then(result => {
      res.redirect('/cart');
    })
    .catch(err =>{
       console.log(err);
    })
  }

  exports.postOrder = (req, res, next) => {
    // create the order
    req.session.user
    .populate('cart.items.productId')
    .then(user => {
      const products = user.cart.items.map(i => {
        return {
          quantity: i.quantity,
          product: {...i.productId._doc}
        }
      });

      const order = new Order({
        user: {
          name: req.user.name,
          userId: req.user
        },
        products: products
      })

      return order.save();
    })
    .then(result => {
       res.redirect('/orders');
    })
    .then(result => {
      return req.user.clearCart();
    })
    .catch(err => console.log(err));
  }

  exports.getOrders = (req, res, next) => {
    Order.find({'user.userId': req.user._id})
      .then(orders => {
        console.log(orders);
        res.render('shop/order', {
          path: '/orders',
          pageTitle: 'Your Orders',
          orders: orders,
          isAuthenticated: req.session.isLoggedIn
        });
      })
      .catch(err => console.log(err));
};