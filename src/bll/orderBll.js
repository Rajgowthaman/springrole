
const mongoose = require('mongoose');
const orderModel = require('../models/orderModel');
const inventoryModel = require('../models/inventoryModel');

module.exports.placeOrderByQty = function (req, res) {
    req.body.qty = parseInt(req.body.qty);
    inventoryModel.findOneAndUpdate({
        productId: req.body.productId, stockQty: {$gte: req.body.qty}
    },{
        $inc: {stockQty: -req.body.qty}
    },function(err, inventoryData){
        if(err) {
            console.log(err);
            return res.status(500).send('Product out of stock');
        }
        if(!inventoryData){
            return res.status(500).send('Requested product not found');
        }
        else {
            console.log('Data::'+JSON.stringify(inventoryData));
            let orderDetails = {
                orderId: Math.floor(Date.now() / 1000),
                userId: req.body.userId,
                productId: req.body.productId,
                qty: req.body.qty,
                price: inventoryData.price,
                shippingFee: inventoryData.shippingFee,
                grandTotal: (req.body.qty*inventoryData.price)+inventoryData.shippingFee
            };
            let order = new orderModel(orderDetails);
            order.save(function (err, results) {
                if(err){
                    console.log(err);
                    res.status(500).send('Order failed');
                    console.log('Incrementing stock by :: '+req.body.qty);
                    inventoryModel.updateOne(
                        {
                            _id: inventoryData._id
                        }, {
                            $inc: {stockQty: req.body.qty}
                        }
                        ,                   
                        function (err, results) {
                        if(err){
                            //todo - notify stock management team for stock correction
                        } else {
                            console.log("Inventory data rollback success");
                        }
                        }
                    );
                } else if(results){
                    res.status(200).send(orderDetails);      
                }
            });
        }
    });
}