
module.exports.placeOrderValidator = function (req, res, next) {
    if(!req.body.productId || req.body.productId.trim() === '') {
       return res.status(500).send('productId is missing');
    } else if(req.body.qty === undefined || req.body.qty.trim === ''){
        return res.status(500).send('qty is missing');
    } else if(isNaN(req.body.qty)){
        return res.status(500).send('qty should be a number')
    } else if(parseFloat(req.body.qty)<= 0){
        return res.status(500).send('qty should be a positive number')
    }
    next();
}