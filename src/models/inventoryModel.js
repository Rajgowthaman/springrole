const mongoose = require('mongoose');

const inventorySchema = new mongoose.Schema({
  productId: {type: Number, required: true, index: true, unique: true},
  productName: {type: String},
  price: {type: Number, min: 0.01},
  description: { type: String },
  stockQty: { type: Number, min: 0},
  inStock: {type: Boolean},
  shippingFee: {type: Number},
  payOnDelivery: {type: Boolean},
  created: {type: Date, default: new Date}
});

const inventoryModel = mongoose.model('inventory', inventorySchema);
module.exports = inventoryModel;