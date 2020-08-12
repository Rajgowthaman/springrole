const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  orderId: {type: Number, required: true, index: true, unique: true},
  userId: {type: String},
  productId: {type: Number},
  qty: {type: Number, min: 1},
  price: {type: Number, min: 0},
  grandTotal: {type: Number, min: 0},
  shippingFee: {type: Number, min: 0},
  created: {type: Date, default: new Date}
});

const orderModel = mongoose.model('order', orderSchema);
module.exports = orderModel;