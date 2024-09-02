const MongoClient = require('mongodb').MongoClient;

// create variable to return db object
let _db;

const mongoConnect = (callback) => {
    MongoClient.connect(
        'mongodb+srv://amalirichibuigwe:123amaliri456@cluster0.ddoctyb.mongodb.net/exercise?retryWrites=true&w=majority&appName=Cluster0'
    )
    .then(client => {
        console.log('connected');
        _db = client.db();
        callback();
    })
}

const getDb = () => {
    if(_db) {
        return _db;
    }

    throw 'No Database Found'
}

exports.mongoConnect = mongoConnect;
exports.getDb = getDb;