const express = require('express');
const app = express();
const userMiddleware = require('../middleware/userMiddleware')
const validator = require('../validator/orderValidator'); 
const orderBll = require('../bll/orderBll');

app.post('/create', [userMiddleware.checkValidRequest, validator.placeOrderValidator], function (req, res) {
    console.log(`Headers :: ${JSON.stringify(req.headers)} Body :: ${JSON.stringify(req.body)}`);
    orderBll.placeOrderByQty(req, res);
});

module.exports = app;