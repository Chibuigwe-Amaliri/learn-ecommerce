const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const productSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  imageUrl: {
    type: String,
    required: true
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
});

module.exports = mongoose.model('Product', productSchema);

/*const getDb = require('../util/database').getDb;
const {ObjectId} = require('mongodb');

 class Product {
    constructor(title, price, description, imageUrl, id) {
        this.title = title;
        this.price = price;
        this.description = description;
        this.imageUrl = imageUrl;
        this._id = id ? new ObjectId(id) : null;
    }

    save() {
        const db = getDb();
        let dbOp;
        if(this._id) {
            dbOp = db
            .collection('products')
            .updateOne({_id: this._id}, {$set: this});
        }else{
            dbOp = db.collection('products').insertOne(this)
        }
        //reachout to the collection
        return dbOp
        .then(result => {
            console.log(result);
            console.log("Added new Product")
        })
        .catch(err => {
            console.log(err);
        })
    }

    static fetchAll() {
        const db = getDb();
        return db
        .collection('products')
        .find()
        .toArray()
        .then(products => {
            console.log(products)
            return products
        })
        .catch(err => {
            console.log(err)
        })
    }

    static findById(prodId) {
        const db = getDb();
        return db
        .collection('products')
        .find({_id: new ObjectId(prodId)})
        .next()
        .then(product => {
            console.log(product);
            return product;
        })
        .catch(err => {
            console.log(err);
        })
    }


    static deleteById(prodId) {
        const db = getDb();
        return db
        .collection('products')
        .deleteOne({_id: new ObjectId(prodId)})
        .then(result => {
            console.log('Destroyed')
        })
        .catch(err => {
            console.log(err)
        });
    }
       
 }

 module.exports = Product; */