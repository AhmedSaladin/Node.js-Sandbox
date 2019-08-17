const fs = require('fs');
const path = require('path');
//
module.exports = class Product {
  constructor(title) {
    this.title = title;
  }

  save() {
    const pth = path.join(
      path.dirname(process.mainModule.filename),
      'data',
      'products.json'
    );
    fs.readFile(pth, (err, contant) => {
      let products = [];
      if (!err) {
        products = JSON.parse(contant);
      }
      products.push(this);
      fs.writeFile(pth, JSON.stringify(products), err => {
        console.log(err);
      });
    });
  }

  static fetchAll(cb) {
    const pth = path.join(
      path.dirname(process.mainModule.filename),
      'data',
      'products.json'
    );
    fs.readFile(pth, (err, content) => {
      if (err) {
        cb([]);
      }
      cb(JSON.parse(content));
    });
  }
};
