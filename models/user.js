const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
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
          type: Schema.Types.ObjectId,
          ref: 'products',
          required: true
        },
        quantity: { type: Number, required: true }
      }
    ]
  }
});
// adding toCart function into user model == class method
userSchema.methods.addToCart = function(product) {
  //cartProductIndex search about if there item in cart have same id
  const cartProductIndex = this.cart.items.findIndex(cp => {
    return cp.productId.toString() === product._id.toString();
  });
  // assign quantity to 1
  let newQuantity = 1;
  // it adding all element in items to updatedCartItems as new array
  const updatedCartItems = [...this.cart.items];
  //check if there is cartProductIndex have true value
  if (cartProductIndex >= 0) {
    //then assign newQuantity to this product to +1 as quantity not new element in cart
    newQuantity = this.cart.items[cartProductIndex].quantity + 1;
    //then assign this specific product quantity to newQuantity
    updatedCartItems[cartProductIndex].quantity = newQuantity;
  } else {
    updatedCartItems.push({
      productId: product._id,
      quantity: newQuantity
    });
  }
  // set updatedCart to new user cart with new updated
  const updatedCart = {
    items: updatedCartItems
  };
  //then make user cart == the updatedCart
  this.cart = updatedCart;
  //then save the result to database
  return this.save();
};
// adding removeFromeCart function into user model == class method
userSchema.methods.removeFromCart = function(productId) {
  /*updatedCartItems it about search about product id by 
  filter method and when find it make new array without 
  it and save the result to user cart(this.cart) */
  const updatedCartItems = this.cart.items.filter(item => {
    return item.productId.toString() !== productId.toString();
  });
  this.cart.items = updatedCartItems;
  return this.save();
};
module.exports = mongoose.model('users', userSchema);
