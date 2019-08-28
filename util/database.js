const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;
let _db;
const mongoConnect = cb => {
  MongoClient.connect(
    'mongodb+srv://Yuri:0106781075@shop-w1yt3.mongodb.net/shop?retryWrites=true&w=majority'
  )
    .then(client => {
      console.log('Connected to database');
      _db = client.db();
      cb();
    })
    .catch(err => {
      console.log(err);
      throw err;
    });
};
const getDb = () => {
  if (_db) {
    return _db;
  }
  throw 'No database';
};
exports.mongoConnect = mongoConnect;
exports.getDb = getDb;
