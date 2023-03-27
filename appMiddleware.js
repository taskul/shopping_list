const ExpressError = require('./expressError');

function checkNamePrice(req, res, next) {
    try {
        if (!req.body.name && !req.body.price) {
            throw new ExpressError('Please enter item name and price', 404);
        } else if (!req.body.name) {
            throw new ExpressError('Please enter item name', 404);
        } else if (!req.body.price) {
            throw new ExpressError(`Please enter the price for ${req.body.name}`, 404);
        } else {
            return next();
        }
    } catch (e) {
        return next(e);
    }

}

module.exports = { checkNamePrice }