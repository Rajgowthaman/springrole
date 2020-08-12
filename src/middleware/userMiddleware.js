
module.exports.checkValidRequest = function (req, res, next) {
    if(!req.body.userId || req.body.userId.trim() === ''){
        return res.status(500).send('userId is missing');
    }
    //todo auth/valid user check
    next();
}