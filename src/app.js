const express = require('express');
const app = express();
const port = process.env.PORT || 8000
const mongoose = require('mongoose');
const bodyParser = require('body-parser')
const constants = require('./config/constants');
const mongodbUrl = constants.MONGODB_URL;
const orderController = require('./controller/orderController');

mongoose.connect(mongodbUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
}).catch((error) => console.log(error.reason));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

app.get('/', (req, res) => {
  res.status(200).send("Hello");
})
//Controllers
app.use('/order', orderController);
//End Controllers

app.get('*', (req, res) => {
  res.status(404).send(constantMsg.INVALID_URL);
})
app.listen(port, () => {
  console.log("App listening on the port : " + port);
});