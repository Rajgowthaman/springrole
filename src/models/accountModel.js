const mongoose = require('mongoose');

const accountSchema = new mongoose.Schema({
  userName: {type: String, lowercase: true, required: true, index: true},
  email: {type: String, lowercase: true, required: true, index: true},
  firstName: { type: String, required: true },
  lastName: { type: String },
  mobile: {type: String},
  isPrimeCustomer: {type: Boolean},
  created: {type: Date, default: new Date}
});

const accountModel = mongoose.model('account', accountSchema);
module.exports = accountModel;