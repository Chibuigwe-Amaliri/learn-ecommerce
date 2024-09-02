const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    cart: {
        items: [
            {
                productId: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'Product',
                    required: true
                },

                quantity: {
                    type: Number,
                    required: true
                }
            }
        ]
    }
})

userSchema.methods.addToCart = function(product) {

    const cartProductIndex = this.cart.items.findIndex(cp => {
        return cp.productId.toString() === product._id.toString();
    })

    let newQuantity = 1;
    const updatedCartItems = [...this.cart.items];

    if(cartProductIndex >= 0) {
        newQuantity = this.cart.items[cartProductIndex].quantity + 1;
        updatedCartItems[cartProductIndex].quantity = newQuantity;
    }else {
        updatedCartItems.push({
            productId: product._id,
            quantity: newQuantity
        });
    }

    const updatedCart = {
        items: updatedCartItems
    };
    this.cart = updatedCart;
    return this.save();
}

userSchema.methods.removeFromCart = function(productId) {
    const updateCartItems = this.cart.items.filter(item => {
        item.productId.toString() !== productId.toString();
    })

    this.cart.items = updateCartItems;
    return this.save();
}

userSchema.methods.clearCart = function() {
    this.cart = { items: [] };
    return this.save();
}

module.exports = mongoose.model('User', userSchema);

/* const mongodb = require('mongodb');
const getDb = require('../util/database').getDb;
const ObjectId = mongodb.ObjectId;

class User {
    constructor (username, email,cart, id) {
        this.name = username;
        this.email = email;
        this.cart = cart; // {items: []}
        this._id = id
    }

    save() {
        const db = getDb();
        return db
        .collection('user')
        .insertOne(this);
        
    }

    static findById(userId) {
        const db = getDb();
        return db
        .collection('users')
        .findOne({_id: new ObjectId(userId)}) 
        .then(user => {
            console.log(user);
            return user;
        })
        .catch(err => {
            console.log(err);
        })
    } 

    addToCart(product) {
        const cartProductIndex = this.cart.items.findIndex(cp => {
            return cp.productId.toString() === product._id.toString();
        });

        let newQuantity = 1;
        const updatedCartItems = [...this.cart.items];

        if(cartProductIndex >= 0) {
            // if true, increase only the quantity
            newQuantity = this.cart.items[cartProductIndex].quantity + 1;
            updatedCartItems[cartProductIndex].quantity = newQuantity;

        }else {
            updatedCartItems.push({
                productId: new ObjectId(product._id),
                quantity: newQuantity
            })
        }

        const updateCart = {
            items: updatedCartItems
        }

        const db = getDb();
        return db.collection('users')
        .updateOne(
            { _id: new ObjectId(this._id) },
            { $set: { cart: updateCart } }
        )
    }

    getCart() {
        const db = getDb();

        const productIds = this.cart.items.map(i => {
            return i.productId;
        })
        return db.collection("products")
        .find({_id: {$in: productIds}})
        .toArray()
        .then(products => {
            return products.map(p => {
                return { ...p, quantity: this.cart.items.find(i => {
                        return i.productId.toString() === p._id.toString();
                    }).quantity
                };
            })
        })



    }

    deleteItemFronCart(productId) {
        // return all the item that are not equall to the productId as a new array
        const updatedCartItems = this.cart.items.filter(item => {
            return item.productId.toString() !== productId.toString();
        })

        const db = getDb();
        return db 
        .collection('users')
        .updateOne(
            {_id: new ObjectId(this._id)},
            {$set: {cart: {items: updatedCartItems}}}
        )
    }

    addOrder() {
        const db = getDb();
        return this.getCart()
        .then(products => {
            const order = {
                items: products,
                user : {
                    _id: new ObjectId(this._id)
                },
                name: this.name
            }
            return db.collection('order').insertOne(order);
        })
        .then(result => {
            this.cart = {items: []};
            return db.collection('users')
            .updateOne(
                {_id: new ObjectId(this._id)},
                
                {$set: {cart: {items: [] } } }
            )
        })
    }

    getOrder() {
        const db = getDb();
        return db
          .collection('order')
          .find({ 'user._id': new ObjectId(this._id) })
          .toArray();
    }
}

module.exports = User; */